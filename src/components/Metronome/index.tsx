import React, { ReactElement, useEffect } from "react";
import "../../sass/Metronome/index.scss";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { toggleFocusMode } from "../../store/actions/app";

import { CSSTransition, SwitchTransition } from "react-transition-group";

import Header from "./Header";
import Indicator from "./Indicator";
import PresetSelector from "./PresetSelector";
import BeatSelector from "./BeatSelector";
import BpmController from "./BpmController";
import PowerButton from "./PowerButton";
import UIButton from "../UIButton";

import { ReactComponent as LeftArrowIcon } from "../../icons/arrowLeft.svg";

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

  let Render: ReactElement;

  if (focusMode)
    Render = (
      <>
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
      </>
    );
  else
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
        key={focusMode ? 1 : 0}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames="focus"
      >
        {Render}
      </CSSTransition>
    </SwitchTransition>
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
