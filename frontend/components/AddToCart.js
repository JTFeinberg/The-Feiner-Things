import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
      AddToCart(id: $id) {
          id
          quantity
      }
  }
`

export default class AddToCart extends Component {
    render() {
        const { id } = this.props
        return (
            <button type="button">
                Add To Cart 🛒
            </button>
        )
    }
}
