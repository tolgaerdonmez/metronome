import React, { ReactElement } from "react";
import "../../sass/Metronome/index.scss";

import Header from "./Header";
import Indicator from "./Indicator";
import PresetSelector from "./PresetSelector";
import BeatSelector from "./BeatSelector";

function Metronome(): ReactElement {
  return (
    <div className="metronome-container">
      <Header />
      <Indicator />
      <div className="bottom-container">
        <PresetSelector />
        <BeatSelector />
      </div>
    </div>
  );
}

export default Metronome;
