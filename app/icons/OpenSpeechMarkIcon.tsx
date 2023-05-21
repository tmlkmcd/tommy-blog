import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const OpenSpeechMarkIcon: React.FC<IconProps> = ({
  size = "md",
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/quote-left-icon
  return (
    <svg
      className={className}
      viewBox="0 0 124 124"
      width={remSize}
      height={remSize}
    >
      <path
        d="M106.97,92.81H84.89c-8.5,0-15.45-6.95-15.45-15.45c0-31.79-8.12-66.71,30.84-76.68 c17.65-4.51,22.25,14.93,3.48,16.27c-11.45,0.82-13.69,8.22-14.04,19.4h17.71c8.5,0,15.45,6.95,15.45,15.45v25.09 C122.88,85.65,115.72,92.81,106.97,92.81L106.97,92.81z M38.23,92.81H16.15c-8.5,0-15.45-6.95-15.45-15.45 c0-31.79-8.12-66.71,30.84-76.68C49.2-3.84,53.8,15.6,35.02,16.95c-11.45,0.82-13.69,8.22-14.04,19.4H38.7 c8.5,0,15.45,6.95,15.45,15.45v25.09C54.14,85.65,46.98,92.81,38.23,92.81L38.23,92.81z"
        fill="currentColor"
      />
    </svg>
  );
};
