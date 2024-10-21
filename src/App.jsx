import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import Confetti from "./components/Confetti";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = { text: newTodo, completed: false };
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>Todo List</h1>
        <ThemeToggle
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a New Todo..."
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="add-todo">
          Add Todo
        </button>
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        setShowConfetti={setShowConfetti} />
      {showConfetti && <Confetti />}
    </div>
  );
}
