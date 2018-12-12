import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import Table from './styles/Table'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
]

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => (
      <div>
        <Error error={error} />
        <div>
          <h2>Manage Permissions</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {possiblePermissions.map(permission => (
                  <th>{permission}</th>
                ))}
                <th>⬇️</th>
              </tr>
            </thead>
            <tbody>{data.users.map(user => user.name)}</tbody>
          </Table>
        </div>
      </div>
    )}
  </Query>
)

class User extends Component {
  render() {
    const { user } = this.props
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    )
  }
}

export default Permissions
