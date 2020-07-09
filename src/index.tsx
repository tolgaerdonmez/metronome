import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/store";

if (!window.ipcRenderer) {
  window.ipcRenderer = {
    on: (e: any, ...args: any[]) => {
      console.log(args);
      return {} as any;
    },
  } as any;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
