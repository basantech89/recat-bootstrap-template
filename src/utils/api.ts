import { patch } from './client'

import { LoginForm } from 'pages/Login'
import { SignUpForm } from 'pages/SignUp'
import { User } from 'redux-store/usersSlice'
import { Todo, TodoState, UITodo } from 'store/todos'
import { get, post, remove } from 'utils'

export const authenticateUser = (user: LoginForm) =>
  post<User & { token: string }, LoginForm>('auth/login', user, false)

export const registerUser = (user: SignUpForm) =>
  post<never, SignUpForm>('auth/register', user, false)

export const fetchUsers = () => get<User[]>('users')

export const logout = () => remove<never>('auth/logout')

export const fetchTodos = () => get<Todo[]>('todos')

export const addTodo = (newTodo: UITodo) => post<Todo, UITodo>('todos', newTodo)

export const removeTodo = (todoId: keyof TodoState['todos']) => remove(`todos/${todoId}`)

export const updateTodo = (updatedTodo: Todo) => patch<Todo, Todo>('todos', updatedTodo)
