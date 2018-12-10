import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

const Signout = props => <button>Sign Out</button>

export default Signout
