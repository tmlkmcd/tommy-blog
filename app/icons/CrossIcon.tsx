import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const CrossIcon: React.FC<IconProps> = ({ size = "md", className }) => {
  const remSize = getSize(size);
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      width={remSize}
      height={remSize}
    >
      <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z" />
    </svg>
  );
};
