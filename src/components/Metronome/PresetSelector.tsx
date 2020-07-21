import React, { ReactElement, useEffect } from "react";
import "../../sass/Metronome/PresetSelector.scss";

import UIButton from "../UIButton";

import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../types/redux";
import { setPreset, beats } from "../../store/actions/metronome";

import { ReactComponent as RightArrowIcon } from "../../icons/arrowRight.svg";
import { ReactComponent as LeftArrowIcon } from "../../icons/arrowLeft.svg";

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

  useEffect(() => {
    const listener = () => changePreset(1);
    window.ipcRenderer.on("app:change-sound-preset", listener);
    return () => {
      window.ipcRenderer.off("app:change-sound-preset", listener);
    };
  }, [changePreset]);

  return (
    <div className="preset-selector-container metronome-child-container">
      <p>Sound Preset</p>
      <div>
        <UIButton
          audio={false}
          icon={LeftArrowIcon}
          onClick={() => changePreset(-1)}
        />
        <div className="preset-screen">
          <p>{preset}</p>
        </div>
        <UIButton
          audio={false}
          icon={RightArrowIcon}
          onClick={() => changePreset(1)}
        />
      </div>
    </div>
  );
}

export default PresetSelector;
