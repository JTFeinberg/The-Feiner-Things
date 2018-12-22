import React, { Component } from 'react'
import Downshift from 'downshift'
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
  state = {
    items: [],
    loading: false
  }
  handleChange = debounce(async (e, client) => {
    //Turn loading on
    this.setState({ loading: true })
    //Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    })
    this.setState({
      items: res.data.items,
      loading: false
    })
  }, 350)
  render() {
    return (
      <SearchStyles>
        <Downshift>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For An Item',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist()
                        this.handleChange(e, client)
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              <DropDown>
                {this.state.items.map(item => (
                  <DropDownItem key={item.id}>
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
              </DropDown>
            </div>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}
