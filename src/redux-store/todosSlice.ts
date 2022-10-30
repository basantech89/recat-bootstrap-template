import { RootState } from '.'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addTodo as apiAddTodo, fetchTodos } from 'utils/api'

type Status = 'idle' | 'pending' | 'success' | 'failed'

export interface Todo {
  title: string
  description: string
  done: boolean
  createdAt: string
  updatedAt: string
  todoId: string
}

export type UITodo = Pick<Todo, 'title' | 'description' | 'done'>

export type TodoState = {
  todos: Record<string, Todo>
  status: Status
}

export const addTodos = createAsyncThunk('todos/addTodos', async () => {
  const { success, data } = await fetchTodos()
  if (success) {
    return {
      todos: data.reduce((allTodos, todo) => {
        allTodos[todo.todoId] = todo
        return allTodos
      }, {} as TodoState['todos']),
      status: 'success'
    }
  }
  return { todos: {}, status: 'failed' }
})

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Todo) => {
  const { success, data } = await apiAddTodo(todo)
  if (success) {
    return {
      todo: data,
      status: 'success'
    }
  }
  return { status: 'failed' }
})

const initialState: TodoState = {
  status: 'idle',
  todos: {}
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTodos.pending, state => {
        state.status = 'pending'
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.status = 'success'
        state.todos = action.payload.todos
      })
      .addCase(addTodos.rejected, state => {
        state.status = 'failed'
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const { todo } = action.payload
        if (todo) {
          state.todos[todo.todoId] = todo
        }
      })
  }
})

export default todosSlice.reducer

export const selectTodos = (state: RootState) => state.todos
