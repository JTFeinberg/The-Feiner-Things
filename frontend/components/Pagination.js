import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
}
`

const Pagination = props => {
    return (
        <PaginationStyles>
            <Query query={PAGINATION_QUERY}>
                {({ data, loading, error }) => {
                    const { count } = data.itemsConnection.aggregate
                    const pages = Math.ceil(count / perPage)
                    return <p>Page 1 of {pages}</p>
                }}
            </Query>

        </PaginationStyles>
    )
}

export default Pagination
