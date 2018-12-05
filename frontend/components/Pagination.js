import React from 'react'
import gql from 'graphql-tag'
import PaginationStyles from './styles/PaginationStyles'

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
            <p>I'm on the Pagination component!</p>
        </PaginationStyles>
    )
}

export default Pagination
