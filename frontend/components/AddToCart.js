import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default class AddToCart extends Component {
    render() {
        const { id } = this.props
        return (
            <button type="button">
                Add To Cart 🛒
            </button>
        )
    }
}
