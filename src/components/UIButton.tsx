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

interface RootProps {
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  audio?: boolean;
}
type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type Props = RootProps & (ButtonProps | SVGProps<SVGSVGElement>);

function UIButton({
  onClick,
  className,
  icon,
  audio,
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
    return (
      <Icon
        onClick={_onClick}
        className={_className + " icon-button"}
        {...(props as SVGProps<SVGSVGElement>)}
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
