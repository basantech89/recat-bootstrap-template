import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

type IconButtonProps = ButtonProps

const IconButton = ({ children, ...rest }: IconButtonProps) => {
  return <Button {...rest}>{children}</Button>
}

export default IconButton
