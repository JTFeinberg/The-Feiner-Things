import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import styled from 'styled-components'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import formatMoney from '../lib/formatMoney'
import OrderItemStyles from './styles/OrderItemStyles'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minMax(40%, 1fr));
`

export default class OrderList extends Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <Error error={error} />
          console.log(orders)
          return (
            <div>
              <h2>You have {orders.length} orders</h2>
            </div>
          )
        }}
      </Query>
    )
  }
}
