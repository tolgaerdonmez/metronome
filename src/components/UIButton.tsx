import React, {
  ReactElement,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from "react";
import { buttonClick } from "../utils/sounds";
import { useSelector } from "react-redux";
import { ReduxState } from "../types/redux";

function UIButton({
  onClick,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>): ReactElement {
  const { playing } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  return (
    <button
      onClick={(e) => {
        if (!playing) buttonClick.play();
        if (onClick) onClick(e);
      }}
      {...props}
    ></button>
  );
}

export default UIButton;
