import './styles.scss'

import { getItem } from '../../utils'

import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = getItem('token')
    if (token) {
      navigate('/users')
    }
  }, [])

  return (
    <div className="auth-layout">
      <div className="auth-layout-img" />
      <Outlet />
    </div>
  )
}

export default AuthLayout
