import React from 'react'
import { Query } from 'react-apollo'
import Error from './ErrorMessage'

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <p>Hey</p>
      </div>
    )}
  </Query>
)

export default Permissions
