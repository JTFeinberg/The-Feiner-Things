const { GraphQLServer } = require('graphql-yoga')
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')
const db = require('./db')

//Create the GraphQL Yoga Server
function createServer() {
  return new GraphQLServer({
    //Cannot be empty
    typeDefs: 'src/schema.graphql',
    //Must resolve to something
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  })
}

module.exports = createServer
