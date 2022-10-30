import Button from 'components/Button'
import SmartForm, { SmartButton, SmartInput } from 'components/Form'

import toastState from 'atoms/toasts'
import { routes } from 'constants/routes'
import React from 'react'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { setItem } from 'utils'
import { authenticateUser } from 'utils/api'

export declare interface LoginForm {
  email: string
  password: string
}

const defaultValues: LoginForm = { email: '', password: '' }

const Login = () => {
  const navigate = useNavigate()

  const [toasts, setToasts] = useRecoilState(toastState)
  const addToast = (msg: string, bg = 'success') => setToasts([...toasts, { msg, bg }])

  const [hidePass, setHidePass] = React.useState(true)
  const toggleHidePass = () => setHidePass(!hidePass)

  const login = async (user: LoginForm) => {
    const { success, data } = await authenticateUser(user)
    if (success) {
      setItem('token', data.token)
      navigate(routes.todos)
    } else {
      addToast(data, 'danger')
    }
  }

  const goToSignup = () => navigate(routes.signUp)

  return (
    <section className="auth">
      <SmartForm<LoginForm>
        mode="onChange"
        onSubmit={login}
        defaultValues={defaultValues}
        className="auth-form"
      >
        <h6>Hello there, Sign in to continue</h6>
        <SmartInput
          label="Email"
          name="email"
          className="auth-form-group"
          rules={{
            required: 'Email is required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address.'
            }
          }}
        />
        <SmartInput
          label="Password"
          name="password"
          type={hidePass ? 'password' : 'text'}
          className="auth-form-group"
          append={
            <Button
              onClick={toggleHidePass}
              className="icon-btn input-icon-btn"
              aria-label="Toggle Password Visibility"
            >
              {hidePass ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          }
          rules={{
            required: 'Password is required.'
          }}
        />
        <SmartButton variant="primary" type="submit" label="Next" />
      </SmartForm>
      <Button variant="link" linkVariant="primary" onClick={goToSignup}>
        Signup
      </Button>
    </section>
  )
}

export default Login
