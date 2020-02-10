import React from 'react'
import { useLocalStore, useObserver } from 'mobx-react'

const Todo = (props) => {
  const todo = useLocalStore(() => ({
    title: "Test",
    done: true,
    toggle() {
      this.done = !this.done
    }
  }))

  return useObserver(() => (
    <h1 onClick={todo.toggle}>
      {todo.title} {todo.done ? "[DONE]" : "[TODO]"}
      { props.children }
    </h1>
  ))
}

export default Todo
