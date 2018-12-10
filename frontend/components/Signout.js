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

const Signout = props => (
  <Mutation mutation={SIGN_OUT_MUTATION}>
    {signout => <button onClick={async () => await signout()}>Sign Out</button>}
  </Mutation>
)

export default Signout
