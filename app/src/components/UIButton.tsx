import React, {
  ReactElement,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  FunctionComponent,
  SVGProps,
} from "react";
import { buttonClick } from "../utils/sounds";
import { useSelector } from "react-redux";
import { ReduxState } from "../types/redux";
import { ISvgProps } from "./icons";

interface RootProps {
  icon?: FunctionComponent<ISvgProps>;
  audio?: boolean;
}

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = RootProps & (ButtonProps | ISvgProps) & { size?: number };

function UIButton({
  onClick,
  className,
  icon,
  audio,
  size = 24,
  ...props
}: Props): ReactElement {
  const { playing } = useSelector((state: ReduxState) => ({
    ...state.metronome,
  }));

  const _onClick = (e: any) => {
    if (!playing && audio !== false) buttonClick.play();
    if (onClick) onClick(e);
  };

  const _className = className ? className + " ui-button" : "ui-button";

  if (icon) {
    const Icon = icon;
    console.log(props);
    return (
      <Icon
        onClick={_onClick}
        className={_className + " icon-button"}
        size={size}
        {...(props as ISvgProps)}
      />
    );
  }

  return (
    <button
      onClick={_onClick}
      className={_className}
      {...(props as ButtonProps)}
    />
  );
}

export default UIButton;
