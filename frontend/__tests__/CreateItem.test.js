import React from 'react'
import { mount } from 'enzyme'
import toJSON from 'enzyme-to-json'
import wait from 'waait'
import { MockedProvider } from 'react-apollo/test-utils'
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem'
import { fakeItem } from '../lib/testUtils'

const dogImage = 'https://dog.com/dog.jpg'
//mock the global fetch API
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
})

describe('<CreateItem />', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJSON(form)).toMatchSnapshot()
  })

  it('uploads a file when changed', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    const input = wrapper.find('input[type="file"]')
    input.simulate('change', { target: { files: ['fakeDog.jpg'] } })
    await wait()
    const component = wrapper.find('CreateItem').instance()
    expect(component.state.image).toEqual(dogImage)
    expect(component.state.largeImage).toEqual(dogImage)
    expect(global.fetch).toHaveBeenCalled()
    global.fetch.mockReset()
  })

  it('handles state updating', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    )
    wrapper.find('#title').simulate('change', { target: { value: 'Testing', name: 'title' } })
    // wrapper
    //   .find('#price')
    //   .simulate('change', { target: { value: '50000', name: 'price', type: 'number' } })
    // wrapper
    //   .find('#description')
    //   .simulate('change', { target: { value: 'This is a really nice item.', name: 'description' } })
  })
})
