import * as React from "react";

function SvgArrowLeft(
  props: React.SVGProps<SVGSVGElement> & { size?: number }
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  );
}

export default SvgArrowLeft;
