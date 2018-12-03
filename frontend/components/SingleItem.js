import React, { Component } from 'react'
import gql from 'graphql-tag'

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
            <div>
                <p>Single Item Component!!</p>
            </div>
        )
    }
}
