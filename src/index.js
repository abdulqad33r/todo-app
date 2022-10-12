import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// const DATA = [
//   { name: "Label 1", id: "checkbox-1", completed: true },
//   { name: "Label 2", id: "checkbox-2", completed: false },
//   { name: "Label 3", id: "checkbox-3", completed: false },
// ];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App
      // tasks={DATA}
      />
    </React.StrictMode>
  </BrowserRouter>
);
