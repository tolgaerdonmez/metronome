import React, { ReactElement, ChangeEvent } from "react";
import "../../sass/Metronome/BpmController.scss";

import UIButton from "../UIButton";
import { ReactComponent as MinusIcon } from "../../icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setBpm } from "../../store/actions/metronome";

interface Props {
  controllable?: boolean;
}

function BpmController({ controllable }: Props): ReactElement {
  const dispatch = useDispatch();
  const { bpm } = useSelector((state: ReduxState) => ({
    ...state.metronome,
    ...state.app,
  }));

  const handleBpmChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value);
    if (isNaN(v)) v = 60;
    dispatch(setBpm(v > 500 ? 500 : v < 0 ? 0 : v));
  };

  const adjustBpm = (value: number) => {
    const v = bpm + value;
    dispatch(setBpm(v > 500 ? 500 : v < 0 ? 0 : v));
  };

  return (
    <div className="bpm-controller-container">
      <input
        type="text"
        value={bpm}
        onChange={handleBpmChange}
        disabled={controllable === false}
      />
      {controllable !== false ? (
        <div>
          <UIButton icon={PlusIcon} onClick={() => adjustBpm(10)} />
          <UIButton icon={MinusIcon} onClick={() => adjustBpm(-10)} />
        </div>
      ) : null}
    </div>
  );
}

export default BpmController;
