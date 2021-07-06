import React, { ReactElement } from "react";
import "../../sass/Metronome/BeatSelector.scss";

import UIButton from "../UIButton";

import { Minus, Plus } from "../icons";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setBeats, setNotes } from "../../store/actions/metronome";
import { withSound } from "../../utils/sounds";
import { useEEventOnOff } from "../../hooks/eevents";

const { eevents } = window;

function BeatSelector(): ReactElement {
  const dispatch = useDispatch();
  const { beats, notes } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeBeats = (value: number) => {
    const b = beats + value;
    dispatch(setBeats(b <= 0 ? 1 : b > 16 ? 16 : b));
  };

  const changeNotes = (value: number) => {
    const n = notes + value;
    dispatch(setNotes(n <= 0 ? 0 : n > 5 ? 5 : n));
  };

  useEEventOnOff(
    eevents.incrementBeatCount,
    withSound(() => changeBeats(1)),
    [changeBeats]
  );

  useEEventOnOff(
    eevents.decrementBeatCount,
    withSound(() => changeBeats(-1)),
    [changeBeats]
  );

  return (
    <div className="beat-selector-container metronome-child-container">
      <div className="beat-controller">
        <div>
          <p>Beats:</p>
          <div>
            <UIButton icon={Minus} onClick={() => changeBeats(-1)} />
            <div className="data-container">
              <p>{beats}</p>
            </div>
            <UIButton icon={Plus} onClick={() => changeBeats(1)} />
          </div>
        </div>
        <div>
          <p>Notes:</p>
          <div>
            <UIButton icon={Minus} onClick={() => changeNotes(-1)} />
            <div className="data-container">
              <p>{2 ** notes}</p>
            </div>
            <UIButton icon={Plus} onClick={() => changeNotes(1)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeatSelector;
