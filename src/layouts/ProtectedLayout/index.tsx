import './styles.scss'

import { authenticate } from '../../utils'

import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedLayout = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const isAuthenticated = authenticate()
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  return (
    <main className="protected-layout">
      <Outlet />
    </main>
  )
}

export default ProtectedLayout
