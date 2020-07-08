import React, { ReactElement } from "react";
import "../../sass/Metronome/Indicator.scss";

import { useSelector } from "react-redux";
import { ReduxState } from "../../types/redux";

function Indicator(): ReactElement {
  const { currentBeat, beats } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  return (
    <ul className="indicator-container">
      {[...new Array(beats)].map((_, index) => (
        <li
          key={index}
          className={`beat 
        ${index + 1 === currentBeat ? " beat-highlight" : ""}
        ${
          beats >= 6 && beats < 11
            ? " beat-sm"
            : beats >= 11 && beats <= 13
            ? " beat-xsm"
            : beats > 13
            ? " beat-xxsm"
            : " beat-m"
        }`}
        ></li>
      ))}
    </ul>
  );
}

export default Indicator;
