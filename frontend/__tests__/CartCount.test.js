import React from 'react'
import { shallow, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import CartCount from '../components/CartCount'

describe('<CartCount />', () => {
  it('renders', () => {
    shallow(<CartCount count={10} />)
  })
})
