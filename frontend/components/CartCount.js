import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: 100;
  /* These two lines standardize the changing widths of different numbers */
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`

const CartCount = ({ count }) => (
  <TransitionGroup>
    <CSSTransition>
      <Dot>{count}</Dot>
    </CSSTransition>
  </TransitionGroup>
)

export default CartCount
