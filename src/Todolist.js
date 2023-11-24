import React, { useEffect, useState } from "react";

const Todolist = () => {
  const [Todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setTodo(data);
      })
      .catch((error) => console.error("Error fetching todos", error));
  }, []);

  console.log(Todo);

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" />
      <button>Add Todo</button>
      <ul>
        {Todo.map((list) => (
          <li>{list.title}</li>
        ))}
        <button>delete</button>
        <button>Edit</button>
      </ul>
    </div>
  );
};

export default Todolist;
