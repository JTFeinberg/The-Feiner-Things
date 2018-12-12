import React from 'react'
import { Query } from 'react-apollo'

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>{({ data, loading, error }) => <p>Hey</p>}</Query>
)
