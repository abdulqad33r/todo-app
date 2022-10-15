import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login-Register.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/todo-app");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-register-container">
      <div className="inputs-container">
        <input
          type="email"
          className="form-control lr-input focus"
          placeholder="Email"
          aria-label="email"
          aria-describedby="basic-addon1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="form-control lr-input focus"
          placeholder="Password"
          aria-label="password"
          aria-describedby="basic-addon1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="btn btn-info btn-lg focus" onClick={login}>
          Log in
        </button>
        <p className="fs-5">
          Don't have an account?
          <Link
            className="link-info px-2 focus register-link"
            to="/todo-app/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
