import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const BlueskyIcon: React.FC<IconProps> = ({
  size = "md",
  className,
}) => {
  const remSize = getSize(size);
  // source https://uxwing.com/bluesky-icon/
  return (
    <svg
      className={className}
      width={remSize}
      height={remSize}
      viewBox="0 0 512 452.263"
    >
      <path
        fill="#0085FF"
        fillRule="nonzero"
        d="M110.983 30.443C169.682 74.656 232.823 164.296 256 212.4v127.056c0-2.705-1.04.351-3.282 6.935-12.094 35.646-59.343 174.777-167.383 63.552-56.888-58.561-30.551-117.119 72.998-134.801-59.239 10.111-125.839-6.6-144.114-72.119C8.958 184.18 0 68.081 0 52.402 0-26.143 68.632-1.454 110.983 30.443zm290.034 0C342.318 74.656 279.177 164.296 256 212.4v127.056c0-2.705 1.04.351 3.282 6.935 12.094 35.646 59.343 174.777 167.383 63.552 56.888-58.561 30.551-117.119-72.998-134.801 59.239 10.111 125.839-6.6 144.114-72.119C503.042 184.18 512 68.081 512 52.402c0-78.545-68.624-53.856-110.983-21.959z"
      />
    </svg>
  );
};
