import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const SubstackIcon: React.FC<IconProps> = ({
  size = "md",
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/substack-icon/
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 448 511.471"
      width={remSize}
      height={remSize}
    >
      <path
        fill="#FF681A"
        d="M0 0h448v62.804H0V0zm0 229.083h448v282.388L223.954 385.808 0 511.471V229.083zm0-114.542h448v62.804H0v-62.804z"
      />
    </svg>
  );
};
