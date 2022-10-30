import './styles.scss'

import React from 'react'
import { Outlet } from 'react-router-dom'

const ErrorLayout = () => {
  return (
    <main className="error-layout">
      <Outlet />
    </main>
  )
}

export default ErrorLayout
