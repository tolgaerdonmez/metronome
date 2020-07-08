import React, {
  ReactElement,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from "react";
import { buttonClick } from "../utils/sounds";

function UIButton({
  onClick,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>): ReactElement {
  return (
    <button
      onClick={(e) => {
        buttonClick.play();
        if (onClick) onClick(e);
      }}
      {...props}
    ></button>
  );
}

export default UIButton;
