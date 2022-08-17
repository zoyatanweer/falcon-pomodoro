import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Signup.css";
import { Header } from "../../Components/Header/Header";

const Signup = () => {
  const [registerFname, setRegisterFname] = useState("");
  const [registerLname, setRegisterLname] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerFname,
        registerLname,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Header />

      <section className="login-signup-page">
        <div className="login-signup-form signup-form">
          <h1 className="form-heading margin-bottom-2rem">SIGN UP</h1>
          <form action="" className="signup">
            <label htmlFor="fname"></label>
            <input
              className="signup-fname"
              type="text"
              id="fname"
              name="fname"
              placeholder="First name"
              onChange={(e) => setRegisterFname(e.target.value)}
              required
            />

            <label htmlFor="lname"></label>
            <input
              className="signup-lname"
              type="text"
              id="lname"
              name="lname"
              placeholder="Last name"
              onChange={(e) => setRegisterLname(e.target.value)}
              required
            />

            <label htmlFor="email"></label>
            <input
              className="signup-email"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />

            <label htmlFor="password"></label>
            <input
              className="signup-password"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />

            <div>
              <button className="signup-btn" onClick={register}>
                Sign Up
              </button>
            </div>
            <p className="login-para">
              Already a user?
              <Link className="login-link" to="/login">
                Log into your account{" "}
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export { Signup };
