// import React from "react";

// const Header = () => {
//   return (
//     <>
//       <div>

//       </div>
//     </>
//   );
// };

// export { Header };

import React from "react";
// import { LogOutIcon, SearchIcon, UserIcon } from "../../Assets/Svg/allsvg";
import { NavLink } from "react-router-dom";
import { DarkModeIcon, UserIcon } from "../../Assets/Svg/allsvg";
import "./Header.css";
// import { useAuth } from "../../context/authContext";

const Header = () => {
  //   const { token, logoutHandler } = useAuth();
  return (
    <>
      <nav className="navigation-container">
        <div className="nav-brand title-theme">
          <NavLink to="/">
            Falcon <span className="title-theme-name">Pomodoro</span>
          </NavLink>
        </div>
        {/* <div className="searchbar">
          <input
            className="desktop-searchbar"
            type="text"
            placeholder="Search for videos"
          />
        </div> */}
        <div className="nav-theme">
          <DarkModeIcon className="theme-icon" />
          <UserIcon className="user-icon" />
        </div>
        <div className="user-profile">
          {/* {token ? (
            <NavLink to="/">
              <button
                onClick={logoutHandler}
                className=" btn box-shadow btn-primary btn-logout"
              >
                <LogOutIcon />
                Logout
              </button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button class="btn box-shadow btn-primary">Login</button>
            </NavLink>
          )} */}
        </div>
      </nav>
      <div className="division"></div>
    </>
  );
};

export { Header };
