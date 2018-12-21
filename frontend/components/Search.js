import React, { Component } from 'react'
import DownShift from 'downshit'
import Router from 'next/router'
import { ApolloConsumer } from 'react adopt'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { Dropdown, DropDownItem, SearchStyles } from './styles/DropDown'

export default class AutoComplete extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <input type="search" />
          <Dropdown>
            <p>Items will go here</p>
          </Dropdown>
        </div>
      </SearchStyles>
    )
  }
}
