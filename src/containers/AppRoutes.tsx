import { routes } from '../constants/routes'
import AuthLayout from '../layouts/AuthLayout'
import ErrorLayout from '../layouts/ErrorLayout'
import ProtectedLayout from '../layouts/ProtectedLayout'

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Login = React.lazy(() => import('../pages/Login'))
const SignUp = React.lazy(() => import('../pages/SignUp'))
const Users = React.lazy(() => import('../pages/Users'))
const Tasks = React.lazy(() => import('../pages/Tasks'))

const Error = React.lazy(() => import('./Error'))
const NoMatch = React.lazy(() => import('./NoMatch'))

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<ErrorLayout />}>
          <Route path={routes.error} element={<Error />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={routes.home} element={<Navigate replace to={routes.login} />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signUp} element={<SignUp />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path={routes.users} element={<Users />} />
          <Route path={routes.tasks} element={<Tasks />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default AppRoutes
