import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const CURRENT_USER_QUERY = gql`
  me(){
    id
    email
    name
    permissions
  }
`
