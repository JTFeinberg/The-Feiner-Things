import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import Router from 'next/router'
import Pagination, { PAGINATION_QUERY } from '../components/Pagination'

Router.router = {
  push() {},
  prefetch() {}
}
function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
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

describe('<Pagination />', () => {
  it('displays a loading message', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    )
    expect(wrapper.text()).toContain('Loading...')
    // const pagination = wrapper.find('[data-test="pagination"]')
    // expect(toJSON(pagination)).toMatchSnapshot()
  })
  it('renders pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
    expect(wrapper.find('.totalPages').text()).toEqual('5')
    const pagination = wrapper.find('[data-test="pagination"]')
    expect(toJSON(pagination)).toMatchSnapshot()
  })
})
