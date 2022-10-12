import React from "react";
import "./FilterButtons.css";

const FilterButtons = (props) => {
  return (
    <button
      onClick={() => {
        props.setFilter(props.name);
      }}
      id="filterButtons"
      type="button"
      className={`btn btn-${props.mode === "dark" ? "primary" : "warning"}`}
    >
      {props.name}
    </button>
    // <button
    //   onClick={() => {
    //     props.setFilter(props.name);
    //   }}
    // >
    //   {props.name}
    // </button>
  );
};

export default FilterButtons;
