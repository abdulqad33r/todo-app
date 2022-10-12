import React, { useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const InputForm = (props) => {
  const [name, setName] = useState("");
  // const [currentUserId, setCurrentUserId] = useState();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleAddTask = () => {
    if (name) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // Sending data to firebase
          addDoc(collection(db, currentUser.uid), {
            todo: name,
            completed: false,
            timestamp: serverTimestamp(),
          }).catch((error) => {
            alert(error.message);
          });
        }
      });

      setName("");
    } else {
      alert("Bhai laanat hai input main to likh kuch.");
    }
  };

  useEffect(() => {});

  return (
    <div className="input-group mb-3 input-form">
      <button
        className={`btn btn-outline-${
          props.mode === "dark" ? "danger" : "primary"
        }`}
        type="button"
        id="addBtn"
        onClick={handleAddTask}
      >
        Add
      </button>
      <input
        style={{
          background: `${props.mode === "dark" ? "transparent" : "white"}`,
          color: `${props.mode === "dark" ? "white" : "#212F3C"}`,
        }}
        type="text"
        className="form-control input"
        placeholder="Enter task"
        aria-label="Enter task"
        aria-describedby="basic-addon1"
        value={name}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
        ref={props.addTaskInput}
      />
    </div>
  );
};

export default InputForm;
