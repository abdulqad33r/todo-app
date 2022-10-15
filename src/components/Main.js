import React, { useState, useEffect, useRef } from "react";
import FilterButtons from "./FilterButtons/FilterButtons";
import Firefly from "./Firefly/Firefly";
import InputForm from "./InputForm";
import SearchForm from "./SearchForm/SearchForm";
import Todo from "./Todo/Todo";
import ToggleMode from "./ToggleMode";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [mode, setMode] = useState("dark");
  const [search, setSearch] = useState("");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#212F3C";
    }
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButtons key={name} name={name} setFilter={setFilter} mode={mode} />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .filter((task) => task.name.toLowerCase().includes(search.toLowerCase()))
    .map((task, index) => (
      <Todo
        key={task.id}
        name={task.name}
        index={index}
        id={task.id}
        completed={task.completed}
        mode={mode}
      />
    ));

  const addTaskInput = useRef(null);
  const prevTasksCount = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTasksCount === -1) {
      addTaskInput.current.focus();
    }
  }, [tasks.length, prevTasksCount]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onSnapshot(
          collection(db, currentUser.uid),
          orderBy("timestamp", "desc"),
          (snapshot) => {
            setTasks(
              snapshot.docs.map((item) => ({
                id: item.id,
                name: item.data().todo,
                completed: item.data().completed,
                timestamp: item.data().timestamp,
              }))
            );
          }
        );
      }
    });
  });

  return (
    <>
      {mode === "dark" && <Firefly />}

      <nav
        className={`navbar navbar-expand-lg navbar-${
          mode === "dark" ? "dark" : "light"
        } bg-${mode === "dark" ? "dark" : "warning"}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand px-5" to="/todo-app">
            Todo app
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarTogglerDemo02"
          >
            <form className="d-flex col-lg-4">
              <SearchForm mode={mode} setSearch={setSearch} />
            </form>
            <ToggleMode toggleMode={toggleMode} mode={mode} />
          </div>
        </div>
      </nav>

      <div className="todo-app">
        <InputForm mode={mode} addTaskInput={addTaskInput} />

        <div>
          <div className="filter-list">
            <p
              className={`task-count text-${
                mode === "dark" ? "info" : "danger"
              }`}
            >
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} remaining.
            </p>
            <div
              className="btn-group mb-3"
              role="group"
              aria-label="Basic example"
            >
              {filterList}
            </div>
          </div>

          <div className="task-list">
            {taskList.length !== 0 ? (
              taskList
            ) : (
              <p
                className={`no-task text-${
                  mode === "dark" ? "danger" : "info"
                }`}
              >
                No task
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
