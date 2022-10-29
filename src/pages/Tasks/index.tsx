import './styles.scss'

import useTodos from '../../store/todos'

import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

const Tasks = () => {
  const { todos, addTodos, addTodo, updateTodo } = useTodos()
  const [newTodo, setNewTodo] = React.useState({ title: '', description: '', done: false })

  React.useEffect(() => {
    addTodos()
  }, [])

  const addNewTodo: React.ChangeEventHandler<HTMLInputElement> = event => {
    const element = event.target
    const nameArr = element.name.split('-')
    const idx = +nameArr[1]
    const prop = nameArr[0]
    const todo = Object.values(todos)[idx]
    addTodo({ ...todo, [prop]: element.type === 'checkbox' ? element.checked : element.value })
  }

  const modifyTodo: React.ChangeEventHandler<HTMLInputElement> = event => {
    const element = event.target
    const prop = event.target.name
    const todo = {
      ...newTodo,
      [prop]: element.type === 'checkbox' ? element.checked : element.value
    }
    setNewTodo(todo)
    if (todo.title && todo.description) {
      // updateTodo(todo)
    }
  }

  return (
    <Form className="tasks">
      {Object.values(todos).map((todo, index) => (
        <InputGroup key={todo.todoId}>
          <Form.Control name={`title-${index}`} onChange={addNewTodo} defaultValue={todo.title} />
          <Form.Control
            name={`description-${index}`}
            onChange={addNewTodo}
            defaultValue={todo.description}
          />
          <InputGroup.Checkbox
            name={`done-${index}`}
            onChange={addNewTodo}
            defaultChecked={todo.done}
          />
        </InputGroup>
      ))}
      <InputGroup>
        <Form.Control value={newTodo.title} onChange={modifyTodo} />
        <Form.Control value={newTodo.description} onChange={modifyTodo} />
        <InputGroup.Checkbox value={newTodo.done} onChange={modifyTodo} />
      </InputGroup>
    </Form>
  )
}

export default Tasks
