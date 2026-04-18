import React, { useState } from "react";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    setTodos([...todos, task]);
    setTask("");
  };

  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h2>Todoリスト</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => removeTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;