import React from "react";
import { NavLink } from "react-router-dom";
import { homepageImg } from "../../Assets";
import { Header } from "../../Components/Header/Header";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <Header />
      <div className="homepage">
        <div class="homepage-left-section">
          <h1 className="heading-h1">Lorem ipsum dolor sit amet</h1>
          <p className="para-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <NavLink to="/tasks">
            <button class="btn box-shadow btn-primary">Get started</button>
          </NavLink>
        </div>
        <img
          className="homepage-cover"
          src={homepageImg}
          alt="homepage image"
        />
      </div>
    </>
  );
};
export { Homepage };
