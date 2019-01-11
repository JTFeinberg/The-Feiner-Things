import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import Nav from '../components/Nav'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser } from '../lib/testUtils'

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
]

describe('<Nav />', () => {
  it('redners a minimal nav when signed out', async () => {
    const wrapper = (
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    )
    await wait()
    wrapper.update()
  })
})
