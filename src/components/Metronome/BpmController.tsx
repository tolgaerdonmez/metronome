import React, { ReactElement, ChangeEvent } from "react";
import UIButton from "../UIButton";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setBpm } from "../../store/actions/metronome";

function BpmController(): ReactElement {
  const dispatch = useDispatch();
  const { bpm } = useSelector((state: ReduxState) => ({
    ...state.metronome,
    ...state.app,
  }));

  const handleBpmChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value);
    if (isNaN(v)) v = 60;
    dispatch(setBpm(v > 500 ? 500 : v));
  };

  const adjustBpm = (value: number) => {
    dispatch(setBpm(bpm + value));
  };

  return (
    <div className="bpm-controller-container">
      <input type="text" value={bpm} onChange={handleBpmChange} />
      <div>
        <UIButton onClick={() => adjustBpm(10)}>+</UIButton>
        <UIButton onClick={() => adjustBpm(-10)}>-</UIButton>
      </div>
    </div>
  );
}

export default BpmController;
