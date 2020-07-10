import React, { ReactElement } from "react";
import "../../sass/Metronome/PresetSelector.scss";

import UIButton from "../UIButton";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setPreset } from "../../store/actions/metronome";

import { ReactComponent as RightArrowIcon } from "../../icons/arrowRight.svg";
import { ReactComponent as LeftArrowIcon } from "../../icons/arrowLeft.svg";

function PresetSelector(): ReactElement {
  const dispatch = useDispatch();
  const { preset } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  const changePreset = (direction: number) => {
    const p = preset + direction;
    dispatch(setPreset(p <= 0 ? 1 : p));
  };

  return (
    <div className="preset-selector-container metronome-child-container">
      <p>Sound Preset</p>
      <div>
        <UIButton icon={LeftArrowIcon} onClick={() => changePreset(-1)} />
        <div className="preset-screen">
          <p>{preset}</p>
        </div>
        <UIButton icon={RightArrowIcon} onClick={() => changePreset(1)} />
      </div>
    </div>
  );
}

export default PresetSelector;
