import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Metronome from "./components/Metronome";
import "./sass/App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const resetHandler = () => dispatch({ type: "RESET", payload: undefined });
    window.ipcRenderer.on("app:reset", resetHandler);
    return () => {
      window.ipcRenderer.removeListener("app:reset", resetHandler);
    };
  }, [dispatch]);
  return <Metronome />;
}

export default App;
