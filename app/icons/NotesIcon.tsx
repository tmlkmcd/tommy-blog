import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const NotesIcon: React.FC<IconProps> = ({ size = "md", className }) => {
  const remSize = getSize(size);
  // source https://uxwing.com/music-icon
  return (
    <svg
      className={className}
      viewBox="0 0 122 122"
      width={remSize}
      height={remSize}
    >
      <path
        d="M87.9,78.04c2.74-0.48,5.33-0.4,7.6,0.13V24.82L39.05,41.03v61.95c0.03,0.34,0.05,0.69,0.05,1.03 c0,0,0,0.01,0,0.01c0,8.34-8.75,16.62-19.55,18.49C8.76,124.37,0,119.12,0,110.77c0-8.34,8.76-16.62,19.55-18.48 c4.06-0.7,7.84-0.39,10.97,0.71l0-76.26h0.47L104.04,0v85.92c0.13,0.63,0.2,1.27,0.2,1.91c0,0,0,0,0,0.01 c0,6.97-7.32,13.89-16.33,15.44c-9.02,1.56-16.33-2.83-16.33-9.8C71.57,86.51,78.88,79.59,87.9,78.04L87.9,78.04L87.9,78.04z"
        fill="currentColor"
      />
    </svg>
  );
};
