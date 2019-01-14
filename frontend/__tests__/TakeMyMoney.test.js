import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import NProgress from 'nprogress'
import Router from 'next/router'
import { MockedProvider } from 'react-apollo/test-utils'
import { ApolloConsumer } from 'react-apollo'
import TakeMyMoney, { CREATE_ORDER_MUTATION } from '../components/TakeMyMoney'
import { CURRENT_USER_QUERY } from '../components/User'
import { fakeUser, fakeCartItem } from '../lib/testUtils'

Router.router = { push() {} }
