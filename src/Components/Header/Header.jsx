import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { DarkModeIcon, LightModeIcon, UserIcon } from "../../Assets/Svg/allsvg";
import "./Header.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav
        className={`navigation-container  ${
          theme === "light" ? "dark-theme" : "light-theme"
        } `}
      >
        <div className="nav-brand title-theme">
          <NavLink to="/">
            Falcon <span className="title-theme-name">Pomodoro</span>
          </NavLink>
        </div>

        <div className="nav-theme">
          {/* <div className="single-action-btn" onClick={themeToggle}> */}
          <div onClick={toggleTheme}>
            {theme === "light" ? (
              <LightModeIcon className="theme-icon" />
            ) : (
              <DarkModeIcon className="theme-icon" />
            )}
          </div>
          {/* <DarkModeIcon className="theme-icon" /> */}
          <NavLink to="/login">
            <UserIcon className="user-icon" />
          </NavLink>
        </div>
        <div className="user-profile"></div>
      </nav>
      <div className="division"></div>
    </>
  );
};

export { Header };
