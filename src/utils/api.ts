import { Todo, TodoState, UITodo } from '../store/todos'

import { patch } from './client'

import { LoginForm } from 'pages/Login'
import { SignUpForm } from 'pages/SignUp'
import { get, post, remove } from 'utils'

declare interface User {
  token: string
  firstName: string
  lastName: string
  email: string
  id: string
}

export const authenticateUser = (user: LoginForm) =>
  post<User, LoginForm>('auth/login', user, false)

export const registerUser = (user: SignUpForm) =>
  post<never, SignUpForm>('auth/register', user, false)

export const fetchUsers = () => get<User[]>('users')

export const logout = () => remove<never>('auth/logout')

export const fetchTodos = () => get<Todo[]>('todos')

export const addTodo = (newTodo: UITodo) => post<Todo, UITodo>('todos', newTodo)

export const removeTodo = (todoId: keyof TodoState['todos']) => remove(`todos/${todoId}`)

export const updateTodo = (updatedTodo: Todo) => patch<Todo, Todo>('todos', updatedTodo)
