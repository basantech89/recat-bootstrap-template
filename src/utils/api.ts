import { LoginForm } from 'pages/Login'
import { SignupForm } from 'pages/Signup'
import { get, post, remove } from 'utils'

export const authenticateUser = (user: LoginForm): Promise<any> => post('auth/login', user)

export const registerUser = (user: SignupForm) => post('auth/register', user)

export const fetchUsers = () => get('users')

export const logout = () => remove('auth/logout')
