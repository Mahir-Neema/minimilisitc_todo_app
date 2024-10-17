import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function TodoItem({
  todo,
  index,
  handleCheckboxChange,
  handleDeleteTodo,
  todos,
  setTodos
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const handleEditSave = () => {
    if (editText.trim() !== "") {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex].text = editText;
      setTodos(updatedTodos);
      setEditingIndex(null);
    }
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEditSave();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {editingIndex === index ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleEditSave} className="save-btn">
              <FaCheck />
            </button>
            <button onClick={handleEditCancel} className="cancel-btn">
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <div className="todo-text">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(index)}
              className="todo-checkbox"
            />
            <span>{todo.text}</span>
          </div>
          <div className="todo-actions">
            <button
              onClick={() => handleEditStart(index)}
              className="edit-btn"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="trash-btn"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
