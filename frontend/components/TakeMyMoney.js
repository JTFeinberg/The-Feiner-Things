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

const totalItems = cart => cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)

export default class TakeMyMoney extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="The Feiner Things"
            description={`Order of ${totalItems(me.cart)}`}>
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    )
  }
}
