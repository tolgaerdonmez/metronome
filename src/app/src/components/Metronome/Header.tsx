import React, { ReactElement } from "react";
import "../../sass/Metronome/Header.scss";

import { useDispatch } from "react-redux";

import UIButton from "../UIButton";
import PowerButton from "./PowerButton";
import BpmController from "./BpmController";
import { toggleTapBpmFocus } from "../../store/actions/metronome";

function Header(): ReactElement {
  const dispatch = useDispatch();
  return (
    <div className="header-container metronome-child-container">
      <PowerButton />
      <BpmController />
      <UIButton
        className="tap-bpm-button"
        onClick={() => {
          dispatch(toggleTapBpmFocus());
        }}
      >
        Tap BPM
      </UIButton>
    </div>
  );
}

export default Header;
