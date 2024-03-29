import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const MediumIcon: React.FC<IconProps> = ({ size = "md", className }) => {
  const remSize = getSize(size);
  // source https://uxwing.com/medium-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 512 291"
      width={remSize}
      height={remSize}
    >
      <path
        d="M288.798 145.387c0 80.297-64.65 145.392-144.401 145.392C64.645 290.779 0 225.703 0 145.387 0 65.072 64.65 0 144.397 0c79.747 0 144.401 65.091 144.401 145.387zm158.41 0c0 75.589-32.327 136.861-72.2 136.861-39.874 0-72.201-61.291-72.201-136.861 0-75.569 32.327-136.86 72.201-136.86 39.873 0 72.2 61.291 72.2 136.86zm64.792 0c0 67.724-11.37 122.621-25.394 122.621-14.023 0-25.394-54.916-25.394-122.621 0-67.704 11.371-122.621 25.399-122.621S512 77.668 512 145.387z"
        fill="#000"
      />
    </svg>
  );
};
