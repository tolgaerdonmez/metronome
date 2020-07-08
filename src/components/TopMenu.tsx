import React, { ReactElement } from "react";
import UIButton from "./UIButton";

function TopMenu(): ReactElement {
  return (
    <div className="topMenu">
      <UIButton className="btn">
        <span className="material-icons">music_note</span>
        Beats
      </UIButton>
      <UIButton className="btn">Capture BPM</UIButton>
    </div>
  );
}

export default TopMenu;
