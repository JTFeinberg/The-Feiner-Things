import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Error from './ErrorMessage'

const SingleItemStyles = styled.div`
max-width: 1200px;
margin: 2rem auto;
box-shadow: ${props => props.theme.bs};
display: grid;
grid-auto-columns: 1fr;
grid-auto-flow: column;
min-height: 800px;
`

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}){
        id
        title
        description
        largeImage
    }
}
`

export default class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ error, loading, data }) => {
                    const { item } = data
                    if (error) return <Error error={error} />
                    if (loading) return <p>Loading...</p>
                    if (!data.item) return <p>No Item Found for ID {this.props.id}</p>
                    return <p>Single Item Component!!</p>
                }}
            </Query>
        )
    }
}
