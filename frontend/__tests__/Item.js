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
  const wrapper = shallow(<ItemComponent item={fakeItem} />)

  it('renders the price tage and title properly', () => {
    const PriceTag = wrapper.find('PriceTag')
    expect(PriceTag.children().text()).toBe('$50')
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title)
  })

  it('renders the image properly', () => {
    const img = wrapper.find('img')
    expect(img.props().src).toBe(fakeItem.image)
    expect(img.props().alt).toBe(fakeItem.title)
  })

  it('renders out the buttons properly', () => {
    const buttonList = wrapper.find('.buttonList')
    expect(buttonList.children()).toHaveLength(3)
  })
})
