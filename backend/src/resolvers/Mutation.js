const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const { promisify } = require('util')

const { transport, makeANiceEmail } = require('../mail')

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
    const item = await ctx.db.query.item({ where }, `{id
    title}`)
    //2. check if they own that item or have the permissions
    //TODO
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
      maxAge: tokenAge,
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
      maxAge: tokenAge,
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
        </a>`)
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
    const [user] = await ctx.db.query.users({ where: { resetToken, resetTokenExpiry_gte: Date.now() } })
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
      maxAge: tokenAge,
    })
    // 8. Return the updated user
    return updatedUser
  }
}

module.exports = Mutations
