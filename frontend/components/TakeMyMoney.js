import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import calcTotalPrice from '../lib/calcTotalPrice'
import Error from './ErrorMessage'
import User, { CURRENT_USER_QUERY } from './User'

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`

const totalItems = cart => cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)

export default class TakeMyMoney extends Component {
  onToken = res => {
    console.log('This is the tokern')
    console.log(res)
  }
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Mutation
            mutation={CREATE_ORDER_MUTATION}
            refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {createOrder => (
              <StripeCheckout
                amount={calcTotalPrice(me.cart)}
                name="The Feiner Things"
                description={`Order of ${totalItems(me.cart)} items`}
                image={me.cart[0].item && me.cart[0].item.image}
                stripeKey="pk_test_8x85XwdCVq3ZbLAt4a6uRLIr"
                currency="USD"
                email={me.email}
                token={res => this.onToken(res)}>
                {this.props.children}
              </StripeCheckout>
            )}
          </Mutation>
        )}
      </User>
    )
  }
}
