import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login-Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      if (password === password2) {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("/tasks");
      } else {
        alert("Password doesn't match");
      }
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
        <input
          type="password"
          className="form-control lr-input focus"
          placeholder="Retype password"
          aria-label="retypePassword"
          aria-describedby="basic-addon1"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        ></input>
        <button className="btn btn-danger btn-lg focus" onClick={register}>
          Create user
        </button>
        <p className="fs-5">
          Already have an account.
          <Link className="link-info px-2 focus login-link" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
