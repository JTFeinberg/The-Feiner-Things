import React, { Component } from 'react'
import DownShift from 'downshift'
import Router from 'next/router'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown'

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      title
      image
    }
  }
`

export default class AutoComplete extends Component {
  handleChange(e, client) {
    console.log('Im inside the client')
    console.log(client)
  }
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist()
                  this.handleChange(e, client)
                }}
              />
            )}
          </ApolloConsumer>
          <DropDown>
            <p>Items will go here</p>
          </DropDown>
        </div>
      </SearchStyles>
    )
  }
}
