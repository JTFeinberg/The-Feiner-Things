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

const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={LOCAL_STATE_QUERY} />
})

const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const { me } = user.data
        if (!me) return null
        const { cart, name } = me
        return (
          <Query query={LOCAL_STATE_QUERY}>
            {({ data }) => (
              <CartStyles open={data.cartOpen}>
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
                  <SickButton>Checkout</SickButton>
                </footer>
              </CartStyles>
            )}
          </Query>
        )
      }}
    </Composed>
  )
}

export default Cart
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION }
