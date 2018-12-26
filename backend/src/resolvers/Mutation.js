const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')
const { transport, makeANiceEmail } = require('../mail')
const { hasPermission } = require('../utils')
const stripe = require('../stripe')

const tokenAge = 1000 * 60 * 60 * 24 * 365 //1 year
const Mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must log in first to sell an item!')
    }
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          //This is how we create a relationship between the item and the user
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          // rather than writing out each property with associated arg, we just spread the args
          ...args
        }
      },
      info
    )
    return item
  },
  updateItem(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args }
    //Remove the ID from updates since it can't be updated
    delete updates.id
    //run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    //1. find the item
    const item = await ctx.db.query.item({ where }, `{id title user { id }}`)
    //2. check if they own that item or have the permissions
    const ownsItem = item.user.id === ctx.request.userId
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    )

    if (!ownsItem && !hasPermissions) {
      throw new Error("You don't have permission to do that!")
    }
    //3. delete it
    return ctx.db.mutation.deleteItem({ where }, info)
  },
  async signup(parent, args, ctx, info) {
    let { email, password } = args
    //Allways lowercase email so that it becomes case agnostic
    email = email.toLowerCase()
    //hash their password
    const saltedPassword = await bcrypt.hash(password, 10)
    //create the use in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: saltedPassword,
          permissions: { set: ['USER'] }
        }
      },
      info
    )
    //create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    //set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      //cannot access this token via JS to protect it from malicious third-parties
      httpOnly: true,
      maxAge: tokenAge
    })
    //finally return user to browser
    return user
  },
  async signin(parent, { email, password }, ctx, info) {
    //1.check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    //2. check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    //3. generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    //4. set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: tokenAge
    })
    //5. return the user
    return user
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'You are signed out!' }
  },
  async requestReset(parent, { email }, ctx, info) {
    // 1. Check if its a real user
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    // 2. Set a reset token and epiry on that user
    const randomBytesPromisified = promisify(randomBytes)
    const resetToken = (await randomBytesPromisified(20)).toString('hex')
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    })
    // 3. Email them that reset token
    const mailRes = await transport.sendMail({
      from: 'no-reply@FeinerThings.com',
      to: email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(
        `Have no fear 😱! Your password reset token is here 📬!
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
          Click Here to Reset
        </a>`
      )
    })
    // 4. Return the message
    return { message: 'Reset has been set' }
  },
  async resetPassword(parent, { password, confirmPassword, resetToken }, ctx, info) {
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      throw new Error(`Passwords do not match!`)
    }
    // 2. Check if its a legit reset token
    // 3. Check if reset token is expired
    const [user] = await ctx.db.query.users({
      where: { resetToken, resetTokenExpiry_gte: Date.now() }
    })
    if (!user) {
      throw new Error(`Incorrect/Expired reset token`)
    }
    // 4. Hash their new password
    const saltedPassword = await bcrypt.hash(password, 10)
    // 5. Save the new password to the user and remove the old resetToken fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: { password: saltedPassword, resetToken: null, resetTokenExpiry: null }
    })
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET)
    // 7. Set the JTW cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: tokenAge
    })
    // 8. Return the updated user
    return updatedUser
  },
  async updatePermissions(parent, { userId, permissions }, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!')
    }
    // 2. Query the current user
    const currentUser = await ctx.db.query.user({ where: { id: ctx.request.userId } }, info)
    // 3. Check if they have permissions to do the update
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])
    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: {
          permissions: {
            set: permissions
          }
        }
      },
      info
    )
  },
  async addToCart(parent, { id }, ctx, info) {
    //1. Check if user is signed in
    const { userId } = ctx.request
    if (!userId) {
      throw new Error('You must be logged in!')
    }
    //2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id }
      }
    })
    //3. Check if at item is already in their cart and incrememnt by 1 if it is
    if (existingCartItem) {
      console.log('This item is already in their cart')
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      )
    }
    //4. Create a new cart item if it isnt
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId }
          },
          item: {
            connect: { id }
          }
        }
      },
      info
    )
  },
  async removeFromCart(parent, { id }, ctx, info) {
    //1. Find the cart Item
    const cartItem = await ctx.db.query.cartItem({ where: { id } }, `{ id, user { id }}`)
    if (!cartItem) {
      throw new Error('No Cart Item Found!')
    }
    //2. make sure they own the cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('That item is not in your cart!')
    }
    //3. Delete that cart item
    return ctx.db.mutation.deleteCartItem({ where: { id } }, info)
  },
  async createOrder(parent, { token }, ctx, info) {
    //1. Query the current user and make sure the are signed in
    const { userId } = ctx.request
    if (!userId) throw new Error('You must be signed in the complete this order.')
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
        id 
        name 
        email 
        cart {
          id 
          quantity 
          item {
            title 
            price 
            id 
            description 
            image 
          }
        }
      }`
    )
    //2. Recalculate the total for the price to prevent savvy users from changing client side price
    const amount = user.cart.reduce((tally, cartItem) => {
      return tally + cartItem.item.price * cartItem.quantity
    }, 0)
    //3. Create the stripe charge (turn toekn into $$)
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: token
    })
    //4. Conver the CartItems to OrderItems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } }
      }
      delete orderItem.id
      return orderItem
    })
    //5. Create the Order
    const order = ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    })
    //6. Clean up - clear the users cart, delete CartItems
    const cartItemIds = user.cart.map(cartItem => cartItem.id)
    //7. Return the Order to the client
  }
}

module.exports = Mutations
