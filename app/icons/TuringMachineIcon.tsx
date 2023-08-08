import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const TuringMachineIcon: React.FC<IconProps> = ({
  size = "md",
  className,
}) => {
  const remSize = getSize(size);
  return (
    <svg
      className={className}
      viewBox="0 0 124 124"
      width={remSize}
      height={remSize}
    >
      <line
        x1="28"
        y1="96"
        x2="44"
        y2="60"
        strokeWidth={4}
        stroke="currentColor"
      />
      <line
        x1="96"
        y1="96"
        x2="84"
        y2="60"
        strokeWidth={4}
        stroke="currentColor"
      />
      <polygon
        points="24,15 104,15 114,60 14,60"
        strokeWidth={4}
        stroke="currentColor"
        fillOpacity="0"
      />
      <circle
        cx="28"
        cy="96"
        r="20"
        strokeWidth={4}
        stroke="currentColor"
        fill="white"
      />

      <circle
        cx="96"
        cy="96"
        r="20"
        strokeWidth={4}
        stroke="currentColor"
        fill="white"
      />
    </svg>
  );
};
