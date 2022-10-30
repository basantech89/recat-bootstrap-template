import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from 'redux-store'
import { addTodo, addTodos, selectTodos } from 'redux-store/todosSlice'

const Todos = () => {
  const dispatch = useAppDispatch()
  const { todos, status } = useAppSelector(selectTodos)
  const [newTodo, setNewTodo] = React.useState({ title: '', description: '', done: false })

  React.useEffect(() => {
    dispatch(addTodos())
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
    <Form>
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

export default Todos
