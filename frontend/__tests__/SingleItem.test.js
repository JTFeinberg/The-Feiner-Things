import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'
import { fakeItem } from '../lib/testUtils'

describe('<SingleItem />', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        //when somebody makes a request with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        //return this fake data (mocked data)
        result: {
          data: {
            item: fakeItem()
          }
        }
      }
    ]
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    )
    expect(wrapper.text()).toContain('Loading...')
  })
})
