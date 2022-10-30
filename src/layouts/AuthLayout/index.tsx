import './styles.scss'

import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getItem } from 'utils'

const AuthLayout = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = getItem('token')
    if (token) {
      navigate('/users')
    }
  }, [])

  return (
    <main className="auth-layout">
      <section className="auth-layout-img" />
      <Outlet />
    </main>
  )
}

export default AuthLayout
