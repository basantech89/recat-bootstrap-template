import './styles.scss'

import logo from 'assets/logos/create-app-logo.png'
import darkTheme from 'assets/styles/themes/dark.lazy.scss'
import lightTheme from 'assets/styles/themes/light.lazy.scss'
import { routes } from 'constants/routes'
import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logoutUser } from 'utils'

const Header = () => {
  const [isLightTheme, setIsLightTheme] = React.useState(true)

  const setLightTheme = () => {
    document.body.setAttribute('class', 'light-theme')
    darkTheme.unuse()
    lightTheme.use()
  }

  const setDarkTheme = () => {
    document.body.setAttribute('class', 'dark-theme')
    lightTheme.unuse()
    darkTheme.use()
  }

  React.useEffect(() => {
    setLightTheme()
  }, [])

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme)
    if (isLightTheme) {
      setDarkTheme()
    } else {
      setLightTheme()
    }
  }

  return (
    <>
      <Navbar expand="lg" className="px-5">
        <Navbar.Brand href="">
          <img src={logo} alt="Logo" className="brand-img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to={routes.home} className="link-secondary">
              Home
            </Link>
          </Nav>
          <Nav>
            <label className="theme-switcher">
              <input type="checkbox" defaultChecked={isLightTheme} onChange={toggleTheme} />
              <span className="slider" />
            </label>
            <Link to={routes.home}>
              <Button variant="danger" onClick={logoutUser} className="logout-btn">
                Logout
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
