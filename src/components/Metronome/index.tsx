import React, { ReactElement, useEffect } from "react";
import "../../sass/Metronome/index.scss";

import { useSelector, useDispatch } from "react-redux";

import Header from "./Header";
import Indicator from "./Indicator";
import PresetSelector from "./PresetSelector";
import BeatSelector from "./BeatSelector";
import { ReduxState } from "../../types/redux";
import BpmController from "./BpmController";
import PowerButton from "./PowerButton";
import { toggleFocusMode } from "../../store/actions/app";
import UIButton from "../UIButton";
// import { SwitchTransition, CSSTransition } from "react-transition-group";

function Metronome(): ReactElement {
  const dispatch = useDispatch();
  const { focusMode } = useSelector((state: ReduxState) => ({
    ...state.app,
  }));

  useEffect(() => {
    window.ipcRenderer.on("app:toggle-focus", () => {
      dispatch(toggleFocusMode());
    });
  }, [dispatch]);

  if (focusMode)
    return (
      <>
        <div className="metronome-container metronome-container-focused">
          <UIButton
            className="exit-focus-button"
            onClick={() => dispatch(toggleFocusMode())}
          >
            {"<"}
          </UIButton>
          <BpmController />
          <Indicator />
          <PowerButton />
        </div>
      </>
    );

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

  // return (
  //   <div
  //     className={`metronome-container ${
  //       focusMode ? "metronome-container-focused" : ""
  //     }`}
  //   >
  //     {focusMode ? (
  //       <>
  //         <BpmController />
  //         <Indicator />
  //         <PowerButton />
  //       </>
  //     ) : (
  //       <>
  //         <Header />
  //         <Indicator />
  //         <div className="bottom-container">
  //           <PresetSelector />
  //           <BeatSelector />
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
}

export default Metronome;
