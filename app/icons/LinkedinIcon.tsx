import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const LinkedinIcon: React.FC<IconProps> = ({
  size = "md",
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/github-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 122 122"
      width={remSize}
      height={remSize}
    >
      <path
        d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"
        fill="#0a66c2"
      />
      <path
        d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"
        fill="white"
      />
    </svg>
  );
};
