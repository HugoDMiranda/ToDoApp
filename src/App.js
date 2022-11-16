import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const todoDateRef = useRef();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todoApp");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoApp", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addToDo(e) {
    const name = todoNameRef.current.value;
    const date = todoDateRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: new Date().getTime(), name: name, complete: false, date: date },
      ];
      // agregar uuid() en el id
    });
    todoNameRef.current.value = null;
    todoDateRef.current.value = null;
  }

  function deleteTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      const name = todoNameRef.current.value;
      const date = todoDateRef.current.value;
      if (name === "") return;
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { id: new Date().getTime(), name: name, complete: false, date: date },
        ];
        // agregar uuid() en el id
      });
      todoNameRef.current.value = null;
      todoDateRef.current.value = null;
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>TODOS</h1>
          <div>{todos.filter((todo) => !todo.complete).length} Left</div>
        </div>
        <div className="addToDo">
          <input
            className="text"
            ref={todoNameRef}
            type="text"
            placeholder="add to do"
            onKeyPress={onKey}
          />
          <input
            className="date"
            ref={todoDateRef}
            type="date"
            onKeyPress={onKey}
          />
          <button className="add" onClick={addToDo}>
            Add Todo
          </button>
          <button className="clear" onClick={handleClearTodos}>
            Clear &#10003; Todos
          </button>
        </div>
        <div className="toDoList">
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
