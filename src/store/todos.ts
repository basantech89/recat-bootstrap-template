import {
  addTodo as apiAddTodo,
  fetchTodos,
  removeTodo as apiRemoveTodo,
  updateTodo as apiUpdateTodo
} from '../utils/api'

import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface Todo {
  title: string
  description: string
  done: boolean
  createdAt: string
  updatedAt: string
  todoId: string
}

export type UITodo = Pick<Todo, 'title' | 'description' | 'done'>

type Status = 'idle' | 'pending' | 'success' | 'failed'

export type TodoState = {
  todos: Record<string, Todo>
  status: Status
}

type Actions = {
  addTodos: () => void
  addTodo: (todo: UITodo) => void
  removeTodo: (todoId: string) => void
  updateTodo: (updatedTodo: Todo) => void
}

const useTodos = create(
  immer<TodoState & Actions>(set => ({
    todos: {},
    status: 'idle',
    addTodo: todo => {
      apiAddTodo(todo).then(({ success, data }) => {
        if (success) {
          set(state => (state.todos[data.todoId] = data))
        }
      })
    },
    addTodos: async () => {
      set({ status: 'pending' })
      const { success, data } = await fetchTodos()
      if (success) {
        set({
          status: 'success',
          todos: data.reduce((allTodos, todo) => {
            allTodos[todo.todoId] = todo
            return allTodos
          }, {} as TodoState['todos'])
        })
      } else {
        set({ status: 'failed' })
      }
    },
    removeTodo: todoId => {
      apiRemoveTodo(todoId).then(({ success }) => {
        if (success) {
          set(state => delete state.todos[todoId])
        }
      })
    },
    updateTodo: newTodo => {
      apiUpdateTodo(newTodo).then(({ success, data }) => {
        if (success) {
          set(state => (state.todos[newTodo.todoId] = data))
        }
      })
    }
  }))
)

export default useTodos
