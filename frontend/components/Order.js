import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { format } from 'date-fns'
import Head from 'next/head'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'
import OrderStyles from './styles/OrderStyles'

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      total
      charge
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`

export default class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>Loading...</p>
          const { order } = data
          return (
            <OrderStyles>
              <Head>
                <title>Feiner Things - Order {order.id}</title>
              </Head>
              <p>Order ID: {this.props.id}</p>
            </OrderStyles>
          )
        }}
      </Query>
    )
  }
}
