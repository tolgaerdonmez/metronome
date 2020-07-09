import React, { ReactElement } from "react";
import "../../sass/Metronome/Header.scss";

import UIButton from "../UIButton";
import PowerButton from "./PowerButton";
import BpmController from "./BpmController";

function Header(): ReactElement {
  return (
    <div className="header-container metronome-child-container">
      <PowerButton />
      <BpmController />
      <UIButton className="tap-bpm-button">Tap BPM</UIButton>
    </div>
  );
}

export default Header;
