import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import styled from 'styled-components'
import gql from 'graphql-tag'
import formatMoney from '../lib/formatMoney'
import OrderItemStyles from './styles/OrderItemStyles'

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      item {
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

export default class OrderList extends Component {
  render() {
    return (
      <div>
        <p>OrderList</p>
      </div>
    )
  }
}
