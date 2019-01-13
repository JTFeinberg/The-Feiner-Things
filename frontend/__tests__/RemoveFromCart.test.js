import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'
import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from '../components/RemoveFromCart'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser, fakeCartItem } from '../lib/testUtils'

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: 'abc123' })]
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_FROM_CART_MUTATION,
      variables: {
        id: 'abc123'
      }
    },
    result: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: 'abc123'
        }
      }
    }
  }
]
