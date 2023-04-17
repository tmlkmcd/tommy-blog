import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const PlayIcon: React.FC<IconProps> = ({ size = "md", className }) => {
  const remSize = getSize(size);
  // source https://uxwing.com/play-round-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 124 124"
      width={remSize}
      height={remSize}
    >
      <path
        d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44S0,95.37,0,61.44S27.51,0,61.44,0L61.44,0z M84.91,65.52c3.41-2.2,3.41-4.66,0-6.61L49.63,38.63c-2.78-1.75-5.69-0.72-5.61,2.92l0.11,40.98c0.24,3.94,2.49,5.02,5.8,3.19 L84.91,65.52L84.91,65.52z"
        fill="currentColor"
      />
    </svg>
  );
};
