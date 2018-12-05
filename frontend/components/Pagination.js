import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Head from 'next/head'
import Link from 'next/link'
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

const Pagination = ({ page }) => {
    return (
        <Query query={PAGINATION_QUERY}>
            {({ data, loading, error }) => {
                const { count } = data.itemsConnection.aggregate
                const pages = Math.ceil(count / perPage)
                return (
                    <PaginationStyles>
                        <Head>
                            <title>Feiner Things – page {page} of {pages}</title>
                        </Head>
                        <Link prefetch href={{
                            pathname: 'items',
                            query: { page: page - 1 }
                        }}>
                            <a>{`<<< Prev`}</a>
                        </Link>
                        <p>Page {page} of {pages}</p>
                    </PaginationStyles>
                )
            }}
        </Query>

    )
}

export default Pagination
