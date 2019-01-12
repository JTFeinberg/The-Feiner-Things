import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset'
import { getMaxListeners } from 'cluster'

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: 'JacobFeinberg92@gmail.com' }
    },
    result: {
      data: { requestReset: { message: 'success', __typename: 'Message' } }
    }
  }
]

describe('<RequestReset />', () => {
  it('renders and matches the snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    )
  })
})
