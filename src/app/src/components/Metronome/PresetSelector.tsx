import React, { ReactElement, useEffect } from "react";
import "../../sass/Metronome/PresetSelector.scss";

import UIButton from "../UIButton";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setPreset, beats } from "../../store/actions/metronome";

import { ArrowRight, ArrowLeft } from "../icons";
import { useEEventOnOff } from "../../hooks/eevents";

const { eevents } = window;

function PresetSelector(): ReactElement {
  const dispatch = useDispatch();
  const { preset, playing } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changePreset = (direction: number) => {
    const p = preset + direction;
    dispatch(setPreset(p <= 0 ? 1 : p));
    if (!playing) beats.second.play();
  };

  useEEventOnOff<null>(eevents.changeSoundPreset, () => changePreset(1), [
    changePreset,
  ]);

  return (
    <div className="preset-selector-container metronome-child-container">
      <p>Sound Preset</p>
      <div>
        <UIButton
          audio={false}
          icon={ArrowLeft}
          onClick={() => changePreset(-1)}
        />
        <div className="preset-screen">
          <p>{preset}</p>
        </div>
        <UIButton
          audio={false}
          icon={ArrowRight}
          onClick={() => changePreset(1)}
        />
      </div>
    </div>
  );
}

export default PresetSelector;
