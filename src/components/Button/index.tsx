import './styles.scss'

import classNames from 'classnames'
import React from 'react'
import { Button as RBButton, ButtonProps as RBButtonProps, Spinner } from 'react-bootstrap'
declare interface ButtonProps extends RBButtonProps {
  loading?: boolean
  linkVariant?: RBButtonProps['variant']
}

const Button = ({ children, className, loading, linkVariant, ...rest }: ButtonProps) => {
  return (
    <RBButton
      {...rest}
      className={classNames(className, {
        [`link-${linkVariant}`]: rest.variant === 'link' && !!linkVariant
      })}
    >
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
