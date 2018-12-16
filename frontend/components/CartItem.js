import React, { Component } from 'react'
import formatMoney from '../lib/formatMoney'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CartItemStyles = styled.li``

const CartItem = ({ cartItem }) => {
  const { image, title } = cartItem.item
  return (
    <CartItemStyles>
      <img width="100" src={image} alt={title} />
    </CartItemStyles>
  )
}
CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
}

export default CartItem
