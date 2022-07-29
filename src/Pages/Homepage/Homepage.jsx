import React from "react";
import { NavLink } from "react-router-dom";
import { homepageImg } from "../../Assets";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <div className="homepage">
        <div class="homepage-left-section">
          <h1 className="heading-h1">Lorem ipsum dolor sit amet</h1>
          <p className="para-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="/">
            <button class="btn box-shadow btn-primary">Get started</button>
          </a>
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
