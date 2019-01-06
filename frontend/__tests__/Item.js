import React from 'react'
import ItemComponent from '../components/Item'
import { shallow } from 'enzyme'

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This is a really cool item!',
  image: 'item.jpg',
  largeImage: 'largeItem.jpg'
}

describe('<Item />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />)
  })
})
