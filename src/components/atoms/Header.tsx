import React from "react";
import "./Header.css";

interface HeaderProps {
  title: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <div className="header-section">
      <h1>{title}</h1>
      <button onClick={onToggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? "☀️" : "🌙"} {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>
    </div>
  );
};

export default Header;
