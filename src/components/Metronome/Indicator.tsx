import React, { ReactElement } from "react";
import "../../sass/Metronome/Indicator.scss";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { toggleFocusMode } from "../../store/actions/app";
import { buttonClick } from "../../utils/sounds";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Indicator(): ReactElement {
  const dispatch = useDispatch();
  const { currentBeat, beats, focusMode, playing } = useSelector(
    (state: ReduxState) => ({
      ...state.metronome,
      ...state.app,
    })
  );

  const toggleFocus = !focusMode
    ? () => {
        if (!playing) buttonClick.play();
        dispatch(toggleFocusMode());
      }
    : () => {};

  const beatClassName = `beat ${
    beats >= 6 && beats < 11
      ? " beat-sm"
      : beats >= 11 && beats <= 13
      ? " beat-xsm"
      : beats > 13
      ? " beat-xxsm"
      : " beat-m"
  }`;

  return (
    <TransitionGroup style={{ width: "100%" }}>
      <ul
        className={`indicator-container metronome-child-container ${
          focusMode ? "indicator-container-focused" : ""
        }`}
        onClick={toggleFocus}
      >
        {[...new Array(beats)].map((_, index) => (
          <CSSTransition
            in={index + 1 === currentBeat}
            key={index}
            timeout={200}
            classNames="blink"
          >
            <li key={index} className={beatClassName} />
          </CSSTransition>
        ))}
      </ul>
    </TransitionGroup>
  );
}

export default Indicator;
