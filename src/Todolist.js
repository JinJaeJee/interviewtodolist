import React, { useEffect, useState } from "react";

const Todolist = () => {
  const [Todo, setTodo] = useState([]);
  const [NewItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setTodo(data);
      })
      .catch((error) => console.error("Error fetching todos", error));
  }, []);

  const handleAddTodo = () => {
    if (NewItem) {
      fetch("http://localhost:3001/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: NewItem }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTodo([...Todo, data]);
          setNewItem("");
        })
        .catch((error) => console.error("Error adding todo", error));
    }
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedTodos = Todo.filter((todo) => todo.id !== id);
        setTodo(updatedTodos);
      })
      .catch((error) => console.error("Error deleting todo", error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={NewItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {Todo.map((list) => (
          <li key={list.id}>
            {list.title}
            <button onClick={() => handleDeleteTodo(list.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
