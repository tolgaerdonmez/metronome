import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { MyContextProvider } from "./context/MyContext";

ReactDOM.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
