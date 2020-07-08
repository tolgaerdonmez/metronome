import React from "react";
import Metronome from "./components/Metronome";
import "./sass/App.scss";
import TopMenu from "./components/TopMenu";

function App() {
  return (
    <>
      <TopMenu />
      <div className="container">
        <Metronome />
      </div>
    </>
  );
}

export default App;
