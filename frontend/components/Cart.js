import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import User from './User'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'

const LOCAL_STATE_QUERY = gql`
  query {
    # @client directive tells apollo to avoid going to db
    # and instead go to client store for data
    cartOpen @client
  }
`

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`

const Cart = () => {
  return (
    <User>{({ data: { me } }) => {
      if (!me) return null
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <CloseButton title="close" onClick={toggleCart}>
                      &times;
                </CloseButton>
                    <Supreme>Your Cart</Supreme>
                    <p>You have __ items in your cart</p>
                  </header>
                  <footer>
                    <p>$10.10</p>
                    <SickButton>Checkout</SickButton>
                  </footer>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      )
    }}
    </User>
  )
}

export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
