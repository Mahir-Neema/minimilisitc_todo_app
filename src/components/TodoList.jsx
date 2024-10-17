import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, setTodos, setShowConfetti }) {
  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    const wasCompleted = updatedTodos[index].completed;
    updatedTodos[index].completed = !wasCompleted;
    setTodos(updatedTodos);

    if (!wasCompleted) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <ul className="todos-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteTodo={handleDeleteTodo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
}
