import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'
import User from './User'
import CartItem from './CartItem'
import CartStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton'
import SickButton from './styles/SickButton'
import calcTotalPrice from '../lib/calcTotalPrice'
import formatMoney from '../lib/formatMoney'
import TakeMyMoney from './TakeMyMoney'

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
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
})
/* eslint-enable */

const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const { me } = user.data
        if (!me) return null
        const { cart, name } = me
        return (
          <CartStyles open={localState.data.cartOpen}>
            <header>
              <CloseButton title="close" onClick={toggleCart}>
                &times;
              </CloseButton>
              <Supreme>{name}'s Cart</Supreme>
              <p>
                You have {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
              </p>
            </header>
            <ul>
              {cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(cart))}</p>
              {me.cart.length && (
                <TakeMyMoney>
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>
        )
      }}
    </Composed>
  )
}

export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
