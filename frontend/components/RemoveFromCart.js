import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'

const BigButton = styled.button``

export default class RemoveFromCart extends Component {
  render() {
    return <BigButton>Hi</BigButton>
  }
}
