const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {
  // Since no additional logic is needed, we can just forward the query logic from prisma straight to the db
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    //Check if there is a user ID i.e. a user is logged in
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info)
  },
  async users(parent, args, ctx, info) {
    // 1. check if the user is logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!')
    }
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    // 3. If they do, query all the users
    return ctx.db.query.users({}, info)
  }
}

module.exports = Query
