import React, { useEffect, useRef, useState } from "react";
import { doc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import "./Todo.css";

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  // const [currentUserId, setCurrentUserId] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleUpdate = () => {
    if (name) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          updateDoc(doc(db, currentUser.uid, props.id), {
            todo: name,
            timestamp: serverTimestamp(),
          }).catch((error) => alert(error.message));
          setName("");
          setIsEditing(false);
        }
      });
    } else {
      alert("Ullu k pathy kuch likh to sai pehly.");
    }
  };

  const viewTemplate = (
    <div
      className="temp"
      style={{
        boxShadow: `${
          props.mode === "dark"
            ? " #1B2631 0px 20px 30px -10px"
            : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
        }`,
        backgroundColor: `${props.mode === "dark" ? "#154360" : "white"}`,
      }}
    >
      <div className="temp-form">
        <p
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          } text-decoration-underline`}
          style={{ zIndex: "2" }}
        >
          {props.index + 1}
        </p>
        <span
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          }`}
          style={{ marginRight: "1rem", zIndex: "2" }}
        >
          .
        </span>

        <div
          className="form-check"
          id="viewtemp-label-check"
          style={{ zIndex: "2" }}
        >
          <input
            className="form-check-input checkbox"
            type="checkbox"
            defaultChecked={props.completed}
            id={props.id}
            onClick={() =>
              onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                  updateDoc(doc(db, currentUser.uid, props.id), {
                    completed: !props.completed,
                  });
                }
              })
            }
          />
          <label
            className={`form-check-label text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
            htmlFor={props.id}
          >
            {props.name}
          </label>
        </div>
      </div>

      <div className="todo-buttons mt-3 mb-4">
        <button
          id="edit-cancel-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "danger" : "primary"
          } mb-2`}
          onClick={() => setIsEditing(true)}
          ref={editButtonRef}
        >
          Edit
        </button>

        <button
          id="delete-save-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "info" : "danger"
          } mb-2`}
          onClick={() => {
            onAuthStateChanged(auth, (currentUser) => {
              if (currentUser) {
                deleteDoc(doc(db, currentUser.uid, props.id));
              }
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const editingTemplate = (
    <div
      className="temp"
      style={{
        boxShadow: `${"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}`,

        backgroundColor: `${props.mode === "dark" ? "#1D2F52" : "white"}`,
        transition: "all 1s",
      }}
    >
      <div className="col-sm-12 temp-form">
        <p
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          } text-decoration-underline`}
          style={{ zIndex: "2" }}
        >
          {props.index + 1}
        </p>
        <span
          className={`fs-4 fw-bolder font-monospace text-${
            props.mode === "dark" ? "light" : "muted"
          }`}
          style={{ marginRight: "1rem", zIndex: "2" }}
        >
          .
        </span>
        <input
          type="text"
          id={props.id}
          className="form-control editInput"
          placeholder="Changing task"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={name}
          onChange={handleChange}
          ref={editFieldRef}
          style={{
            background: "transparent",
            color: `${props.mode === "dark" ? "white" : "#212F3C"}`,
            transition: "2.5s all",
            zIndex: "2",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleUpdate();
            }
          }}
        ></input>
      </div>

      <div className="todo-buttons mt-3 mb-4">
        <button
          id="edit-cancel-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "info" : "danger"
          } mb-2`}
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>

        <button
          id="delete-save-button"
          type="button"
          className={`btn btn-outline-${
            props.mode === "dark" ? "danger" : "primary"
          } mb-2`}
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    }
  }, [isEditing]);

  return isEditing ? (
    <div className="todo-item">{editingTemplate}</div>
  ) : (
    <div className="todo-item">{viewTemplate}</div>
  );
};

export default Todo;
