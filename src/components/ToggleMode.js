import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ToggleMode = (props) => {
  const navigate = useNavigate();

  const signout = async () => {
    await signOut(auth);
    navigate("/todo-app");
  };

  return (
    <div className="form-check form-switch togglemode">
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked="true"
        role="switch"
        id="flexSwitchCheckDefault"
        onClick={() => props.toggleMode()}
      />
      <label
        className={`form-check-label px-2 text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
        htmlFor="flexSwitchCheckDefault"
      >
        Enable {props.mode === "dark" ? "light" : "dark"} mode.
      </label>

      <button
        type="button"
        className={`btn btn-${
          props.mode === "light" ? "danger" : "outline-info"
        } px-5`}
        onClick={signout}
      >
        Sign out
      </button>
    </div>
  );
};

export default ToggleMode;
