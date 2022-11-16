import React from 'react'
import '../stylesheets/Todo.css'

function Todo({ todo, toggleTodo, deleteTodo}) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  

  return (
    <div className={`todo ${todo.complete ? 'complete' : ''}`.trimEnd()}>
      <label >
        <input  type='checkbox' checked={todo.complete} onChange={handleTodoClick} />
        <p>{todo.name} </p>
        <p>{todo.date}</p>
        <button onClick={() => deleteTodo(todo.id)}>x</button>
      </label> 
    </div>
  )
}

export default Todo