import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../types/redux";
import { startBeats, stopBeats } from "../../store/actions/metronome";
import { ReactComponent as PowerIcon } from "../../icons/power.svg";
import UIButton from "../UIButton";

function PowerButton(): ReactElement {
  const dispatch = useDispatch();
  const { playing } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  const togglePower = () => {
    if (playing) {
      dispatch(stopBeats());
    } else {
      dispatch(startBeats());
    }
  };

  return (
    <UIButton
      className={`power-button ${playing ? "power-button-on" : ""}`}
      onClick={togglePower}
      icon={PowerIcon}
      audio={false}
    />
  );
}

export default PowerButton;
