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
  }
  //   createDog(parent, args, ctx, info) {
  //     global.dogs = global.dogs || [];
  //     const newDog = { name: args.name };
  //     global.dogs.push(newDog);
  //     return newDog;
  //   }
}

module.exports = Mutations
