import React from 'react'
import formatMoney from '../lib/formatMoney'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CartItemStyles = styled.li``

const CartItem = ({ cartItem }) => {
  const { image, title, price } = cartItem.item
  return (
    <CartItemStyles>
      <img width="100" src={image} alt={title} />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>
          {formatMoney(price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(price)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  )
}
CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired
}

export default CartItem
