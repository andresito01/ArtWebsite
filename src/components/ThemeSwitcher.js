import "./styles/ThemeSwitcher.css";
import React from "react";
import { Moon, Sun } from "react-feather";

const ThemeSwitcher = ({ toggleTheme, isDarkTheme }) => {
  return (
    <span className="dark-light-switch" onClick={toggleTheme}>
      {isDarkTheme ? <Moon size={24} /> : <Sun size={24} />}
    </span>
  );
};

export default ThemeSwitcher;
