import React, { ReactElement } from "react";
import "../../sass/Metronome/TabBpmScreen.scss";

import { useDispatch, useSelector } from "react-redux";

import UIButton from "../UIButton";
import BpmController from "./BpmController";
import { ReduxState } from "../../types/redux";

import { Refresh } from "../icons";

import {
  incrementTapCount,
  setTapBpm,
  startTapBpm,
} from "../../store/actions/metronome";
import { CSSTransition } from "react-transition-group";

function TapBpmScreen(): ReactElement {
  const dispatch = useDispatch();
  const { count } = useSelector(
    ({ metronome: { tapBpm } }: ReduxState) => tapBpm
  );

  const refresh = () => {
    dispatch(setTapBpm({ count: 0, endTime: 0, startTime: 0 }));
  };

  const tap = () => {
    if (!count) dispatch(startTapBpm());
    else dispatch(incrementTapCount());
  };

  return (
    <div className="tab-bpm-screen-container">
      <p>Tap the button or T in keyboard</p>
      <BpmController controllable={false} />
      <div>
        <UIButton audio={false} className="tab-bpm-button" onClick={tap}>
          Tap!
        </UIButton>
        <CSSTransition
          in={!!count}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <UIButton icon={Refresh} onClick={refresh} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default TapBpmScreen;
