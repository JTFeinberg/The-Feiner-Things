import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import Pagination, { PAGINATION_QUERY } from '../components/Pagination'

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY, variables: { skip: 0, first: 4 } },
      result: {
        data: {
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              __typename: 'count',
              count: length
            }
          }
        }
      }
    }
  ]
}
