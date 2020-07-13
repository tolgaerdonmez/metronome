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

import { ReactComponent as LeftArrowIcon } from "../../icons/arrowLeft.svg";
import TapBpmScreen from "./TapBpmScreen";
import { toggleTapBpmFocus } from "../../store/actions/metronome";
import { buttonClick } from "../../utils/sounds";

function Metronome(): ReactElement {
  const dispatch = useDispatch();
  const { focusMode, tapBpm, bpm, playing } = useSelector(
    (state: ReduxState) => ({
      ...state.app,
      ...state.metronome,
    })
  );

  useEffect(() => {
    const toggle = () => {
      dispatch(toggleFocusMode());
    };
    window.ipcRenderer.on("app:toggle-focus", toggle);

    return () => {
      window.ipcRenderer.off("app:toggle-focus", toggle);
    };
  }, [dispatch]);

  useEffect(() => {
    const toggle = (_: any, v: any) => {
      if (playing) dispatch(stopBeats());
      else dispatch(startBeats());
    };
    const changeSpeed = (_: any, v: any) => {
      dispatch(setBpm(bpm + v));
      buttonClick.play();
    };

    window.ipcRenderer.on("beats:start-stop", toggle);
    window.ipcRenderer.on("beats:change-speed", changeSpeed);

    return () => {
      window.ipcRenderer.off("beats:start-stop", toggle);
      window.ipcRenderer.off("beats:change-speed", changeSpeed);
    };
  }, [dispatch, playing, bpm]);

  useEffect(() => {
    const tap = () => {
      if (tapBpm.focusMode) {
        if (playing) dispatch(stopBeats());
        if (tapBpm.startTime) dispatch(incrementTapCount());
        else dispatch(startTapBpm());
        buttonClick.play();
      }
    };

    window.ipcRenderer.once("beats:tap-bpm", tap);

    return () => {
      window.ipcRenderer.off("beats:tap-bpm", tap);
    };
  }, [dispatch, tapBpm.count, tapBpm.startTime, tapBpm.focusMode, playing]);

  let Render: ReactElement;

  if (focusMode)
    Render = (
      <div className="metronome-container-focused">
        <UIButton
          className="exit-focus-button"
          onClick={() => dispatch(toggleFocusMode())}
          icon={LeftArrowIcon}
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
          icon={LeftArrowIcon}
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
