import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

interface ChevronProps {
  direction: "up" | "down" | "left" | "right";
}

export const ChevronIcon: React.FC<IconProps & ChevronProps> = ({
  size = "md",
  direction,
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/line-angle-up-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 124 62"
      width={remSize}
      height={remSize}
      transform={(() => {
        switch (direction) {
          case "left":
            return "rotate(-90)";
          case "right":
            return "rotate(90)";
          case "down":
            return "rotate(180)";
          default:
            return "";
        }
      })()}
    >
      <path
        d="M11.68,64.96c-2.72,2.65-7.08,2.59-9.73-0.14c-2.65-2.72-2.59-7.08,0.13-9.73L56.87,1.97l4.8,4.93l-4.81-4.95 c2.74-2.65,7.1-2.58,9.76,0.15c0.08,0.08,0.15,0.16,0.23,0.24L120.8,55.1c2.72,2.65,2.78,7.01,0.13,9.73 c-2.65,2.72-7,2.78-9.73,0.14L61.65,16.5L11.68,64.96L11.68,64.96z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon {...props} direction="up" />
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon {...props} direction="down" />
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon {...props} direction="left" />
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <ChevronIcon {...props} direction="right" />
);
