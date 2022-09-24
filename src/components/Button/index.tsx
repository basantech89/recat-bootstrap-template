import './styles.scss'

import React from 'react'
import { Button as RBButton, ButtonProps as RBButtonProps, Spinner } from 'react-bootstrap'
declare interface ButtonProps extends RBButtonProps {
  loading?: boolean
}

const Button = ({ children, loading, ...rest }: ButtonProps) => {
  return (
    <RBButton {...rest}>
      {loading ? (
        <Spinner animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </RBButton>
  )
}

export default Button
