import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import PleaseSignIn from '../components/PleaseSignIn'
import { CURRENT_USER_QUERY } from '../components/User '
import { fakeUser } from '../lib/testUtils'

const notSignedInMOcks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
]

const signedInMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
]
