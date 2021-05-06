import React, { ReactElement } from "react";
import "../sass/Shortcuts.scss";

import { useSelector } from "react-redux";
import { ReduxState } from "../types/redux";

function Shortcuts(): ReactElement {
  const { shortcuts } = useSelector((state: ReduxState) => ({
    ...state.app,
  }));

  const formatMapping = (mapping: string) =>
    mapping
      .replace("+", " + ")
      .replace("numadd", "Plus")
      .replace("numsub", "Minus");

  return (
    <div className="shortcuts-container">
      {shortcuts
        ? shortcuts.map(({ title, shortcuts }) => (
            <div key={title + shortcuts.length.toString()}>
              <p className="title">{title}</p>
              <ul>
                {shortcuts.map(({ label, mapping }) => (
                  <li>
                    <span className="label">{label}</span>
                    <span className="mapping">{formatMapping(mapping)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : null}
    </div>
  );
}

export default Shortcuts;
