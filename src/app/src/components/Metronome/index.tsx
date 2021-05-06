import React, { ReactElement, useEffect } from "react";
import "../../sass/Metronome/index.scss";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { toggleFocusMode } from "../../store/actions/app";
import {
  incrementTapCount,
  setBpm,
  startBeats,
  startTapBpm,
  stopBeats,
} from "../../store/actions/metronome";

import { CSSTransition, SwitchTransition } from "react-transition-group";

import Header from "./Header";
import Indicator from "./Indicator";
import PresetSelector from "./PresetSelector";
import BeatSelector from "./BeatSelector";
import BpmController from "./BpmController";
import PowerButton from "./PowerButton";
import UIButton from "../UIButton";

import { ArrowLeft } from "../icons";
import TapBpmScreen from "./TapBpmScreen";
import { toggleTapBpmFocus } from "../../store/actions/metronome";
import { withSound } from "../../utils/sounds";
import { useEEventOnOff } from "../../hooks";

const { eevents } = window;

function Metronome(): ReactElement {
  const dispatch = useDispatch();
  const { focusMode, tapBpm, bpm, playing } = useSelector(
    (state: ReduxState) => ({
      ...state.app,
      ...state.metronome,
    })
  );

  useEEventOnOff(
    eevents.toggleToFocusScreen,
    withSound(() => {
      dispatch(toggleFocusMode());
    }),
    [dispatch]
  );

  useEEventOnOff(
    eevents.startStopBeats,
    (_, __) => {
      if (playing) dispatch(stopBeats());
      else if (!tapBpm.focusMode) dispatch(startBeats());
    },
    [dispatch, playing, tapBpm.focusMode]
  );

  useEEventOnOff(
    eevents.changeBpm,
    withSound((_: any, v: number) => {
      dispatch(setBpm(bpm + v));
    }),
    [dispatch, bpm]
  );

  useEEventOnOff(
    eevents.tapBpm,
    withSound(() => {
      if (tapBpm.focusMode) {
        if (playing) dispatch(stopBeats());
        if (tapBpm.startTime) dispatch(incrementTapCount());
        else dispatch(startTapBpm());
      } else {
        dispatch(toggleTapBpmFocus());
      }
    }),
    [dispatch, tapBpm.count, tapBpm.startTime, tapBpm.focusMode, playing]
  );

  let Render: ReactElement;

  if (focusMode)
    Render = (
      <div className="metronome-container-focused">
        <UIButton
          className="exit-focus-button"
          onClick={() => dispatch(toggleFocusMode())}
          icon={ArrowLeft}
        />
        <BpmController />
        <Indicator />
        <PowerButton />
      </div>
    );
  else if (tapBpm.focusMode) {
    Render = (
      <div className="metronome-container-focused">
        <UIButton
          className="exit-focus-button"
          onClick={() => dispatch(toggleTapBpmFocus())}
          icon={ArrowLeft}
        />
        <TapBpmScreen />
      </div>
    );
  } else
    Render = (
      <div className="metronome-container">
        <Header />
        <Indicator />
        <div className="bottom-container">
          <PresetSelector />
          <BeatSelector />
        </div>
      </div>
    );

  return (
    <SwitchTransition>
      <CSSTransition
        key={focusMode ? 1 : tapBpm.focusMode ? 2 : 0}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="focus"
      >
        {Render}
      </CSSTransition>
    </SwitchTransition>
  );
}

export default Metronome;
