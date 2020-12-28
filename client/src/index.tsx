import React from "react";
import ReactDOM from "react-dom";
import Globals from "./styles/globals";
import App from "./components/app/app";

ReactDOM.render(
  <React.StrictMode>
    <Globals />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
