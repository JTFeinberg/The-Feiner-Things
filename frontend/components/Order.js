import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render() {
    return <p>Order ID: {this.props.id}</p>
  }
}
