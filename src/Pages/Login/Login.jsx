import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { Header } from "../../Components/Header/Header";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    console.log(user);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Header />
      <section className="login-signup-page">
        <div className="login-signup-form login-form">
          <h1 className="form-heading margin-bottom-2rem">LOGIN</h1>
          <form action="">
            <label htmlFor="email"></label>
            <input
              className="login-email margin-bottom-2rem"
              type="text"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <label htmlFor="password"></label>
            <input
              className="login-password margin-bottom-2rem"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <div className="remember-me-block">
              <input
                className="remember-me-input"
                type="checkbox"
                id="remember-me"
                name="remember me"
              ></input>
              <label className="remember-me-label" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <div className="forgot-pwd-block">
              <Link className="forgot-pwd-para" to="">
                Forgot password?
              </Link>
            </div>
            <div className="buttons-block">
              <button className="login login-btn" onClick={login}>
                LOGIN
              </button>
            </div>
            <p className="login-para">
              Not a user yet?
              <Link className="login-link" to="/signup">
                Create your account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export { Login };
