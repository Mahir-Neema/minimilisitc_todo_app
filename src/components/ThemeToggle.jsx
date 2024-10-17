import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ toggleDarkMode, isDarkMode }) {
  return (
    <button onClick={toggleDarkMode} className="theme-toggle">
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
