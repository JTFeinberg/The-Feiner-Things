import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`

export default class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  }
  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({ [name]: val })
  }
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form>
            <fieldset
              onSubmit={e => {
                e.preventDefault()
              }}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter A Description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CREATE_ITEM_MUTATION }
