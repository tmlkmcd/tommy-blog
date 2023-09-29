import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

interface ChevronProps {
  direction: "up" | "down" | "left" | "right";
}

export const DblChevronIcon: React.FC<IconProps & ChevronProps> = ({
  size = "md",
  direction,
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/double-arrow-top-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 124 124"
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
        d="M108.91,66.6c1.63,1.55,3.74,2.31,5.85,2.28c2.11-0.03,4.2-0.84,5.79-2.44l0.12-0.12c1.5-1.58,2.23-3.6,2.2-5.61 c-0.03-2.01-0.82-4.01-2.37-5.55C102.85,37.5,84.9,20.03,67.11,2.48c-0.05-0.07-0.1-0.13-0.16-0.19C65.32,0.73,63.19-0.03,61.08,0 c-2.11,0.03-4.21,0.85-5.8,2.45l-0.26,0.27C37.47,20.21,19.87,37.65,2.36,55.17C0.82,56.71,0.03,58.7,0,60.71 c-0.03,2.01,0.7,4.03,2.21,5.61l0.15,0.15c1.58,1.57,3.66,2.38,5.76,2.41c2.1,0.03,4.22-0.73,5.85-2.28l47.27-47.22L108.91,66.6 L108.91,66.6z M106.91,118.37c1.62,1.54,3.73,2.29,5.83,2.26c2.11-0.03,4.2-0.84,5.79-2.44l0.12-0.12c1.5-1.57,2.23-3.6,2.21-5.61 c-0.03-2.01-0.82-4.02-2.37-5.55C101.2,89.63,84.2,71.76,67.12,54.24c-0.05-0.07-0.11-0.14-0.17-0.21 c-1.63-1.55-3.76-2.31-5.87-2.28c-2.11,0.03-4.21,0.85-5.8,2.45C38.33,71.7,21.44,89.27,4.51,106.8l-0.13,0.12 c-1.54,1.53-2.32,3.53-2.35,5.54c-0.03,2.01,0.7,4.03,2.21,5.61l0.15,0.15c1.58,1.57,3.66,2.38,5.76,2.41 c2.1,0.03,4.22-0.73,5.85-2.28l45.24-47.18L106.91,118.37L106.91,118.37z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DblChevronUpIcon: React.FC<IconProps> = (props) => (
  <DblChevronIcon {...props} direction="up" />
);

export const DblChevronDownIcon: React.FC<IconProps> = (props) => (
  <DblChevronIcon {...props} direction="down" />
);

export const DblChevronLeftIcon: React.FC<IconProps> = (props) => (
  <DblChevronIcon {...props} direction="left" />
);

export const DblChevronRightIcon: React.FC<IconProps> = (props) => (
  <DblChevronIcon {...props} direction="right" />
);
