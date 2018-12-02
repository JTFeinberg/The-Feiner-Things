const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TO DO: Check if they are logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
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
  }
}

module.exports = Mutations
