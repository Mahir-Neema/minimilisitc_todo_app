import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoObj = { text: newTodo, completed: false };
      setTodos([...todos, newTodoObj]);
      setNewTodo('');
      setShowEmoji(false);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodoObj]));
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    setShowEmoji(true);
    setTimeout(() => {
      setShowEmoji(false);
    }, 2000);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const EmojiAnimation = () => {
    return (
      <div className="emoji-animation">
        <div className="emoji-popup">
          🥳
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ backgroundColor: todo.completed ? '#5E35B1' : 'white',
            color: todo.completed ? 'white' : 'black',
            transform: todo.completed ? 'scale(1.02)' : 'scale(1)' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
      {showEmoji && <EmojiAnimation />}
    </div>
  );
}
