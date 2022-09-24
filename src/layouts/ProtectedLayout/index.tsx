import './styles.scss'

import { routes } from '../../constants/routes'
import { getItem, logoutUser } from '../../utils'

import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const ProtectedLayout = () => {
  const navigate = useNavigate()

  // React.useEffect(() => {
  //   const token = getItem('token')
  //   if (!token) {
  //     navigate('/')
  //   }
  // }, [])

  return (
    <div className="protected-layout">
      <Navbar>
        <Navbar.Brand href="">
          <img
            src="https://drive.google.com/uc?export=view&id=1hvRAGrdq0SqFBZApx2--IcuDf-DOmOBH"
            alt="wissen-logo"
          />
        </Navbar.Brand>
        <Button variant="danger" onClick={logoutUser} className="logout-btn">
          <Link to={routes.home}>Logout</Link>
        </Button>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default ProtectedLayout
