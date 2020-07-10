import React, { ReactElement } from "react";
import "../../sass/Metronome/BeatSelector.scss";

import UIButton from "../UIButton";
import { ReactComponent as MinusIcon } from "../../icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setBeats, setNotes } from "../../store/actions/metronome";

function BeatSelector(): ReactElement {
  const dispatch = useDispatch();
  const { beats, notes } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  const changeBeats = (value: number) => {
    const b = beats + value;
    dispatch(setBeats(b <= 0 ? 1 : b > 16 ? 16 : b));
  };

  const changeNotes = (value: number) => {
    const n = notes + value;
    dispatch(setNotes(n <= 0 ? 0 : n > 5 ? 5 : n));
  };

  return (
    <div className="beat-selector-container metronome-child-container">
      <div className="beat-controller">
        <div>
          <p>Beats:</p>
          <div>
            <UIButton icon={MinusIcon} onClick={() => changeBeats(-1)} />
            <UIButton icon={PlusIcon} onClick={() => changeBeats(1)} />
          </div>
        </div>
        <div>
          <p>Notes:</p>
          <div>
            <UIButton icon={MinusIcon} onClick={() => changeNotes(-1)} />
            <UIButton icon={PlusIcon} onClick={() => changeNotes(1)} />
          </div>
        </div>
      </div>
      <div className="beat-screen">
        <p>{beats}</p>
        <div />
        <p>{2 ** notes}</p>
      </div>
    </div>
  );
}

export default BeatSelector;
