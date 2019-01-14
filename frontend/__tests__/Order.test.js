import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import Order, { SINGLE_ORDER_QUERY } from '../components/Order'
import { fakeOrder } from '../lib/testUtils'

const mocks = [
  {
    request: {
      query: SINGLE_ORDER_QUERY,
      variables: { id: 'ord123' }
    },
    result: {
      data: {
        order: fakeOrder()
      }
    }
  }
]
