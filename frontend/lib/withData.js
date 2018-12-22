import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { endpoint } from '../config'
import { LOCAL_STATE_QUERY } from '../components/Cart'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          // First argument is unused (ever?) so we  use _
          // Third argument is client, but we dont need the whole thing so we just destructure the cache
          toggleCart(_, variables, { cache }) {
            // Read the cartOpen value from cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            })
            // Write the cart state to the opposite
            const data = {
              data: {
                cartOpen: !cartOpen
              }
            }
            cache.writeData(data)
            return data
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  })
}

export default withApollo(createClient)
