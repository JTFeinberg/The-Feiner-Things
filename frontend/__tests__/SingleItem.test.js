import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem'
import { fakeItem } from '../lib/testUtils'

describe('<SingleItem />', () => {
    if('renders with proper data', async () => {
        const wrapper = mount(
            <MockedProvider>
                <SingleItem id='123'/>
            </MockedProvider>
        )
    })
})