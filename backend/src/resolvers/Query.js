const { forwardTo } = require('prisma-binding')

const Query = {
  // Since no additional logic is needed, we can just forward the query logic from prisma straight to the db
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db')
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
}

module.exports = Query
