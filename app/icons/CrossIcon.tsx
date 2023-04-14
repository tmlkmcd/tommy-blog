import * as React from "react";
import type { IconProps } from "~/icons/types";
import { getSize } from "~/icons/types";

export const CrossIcon: React.FC<IconProps> = ({ size = "md", className }) => {
  const remSize = getSize(size);
  // source https://uxwing.com/close-line-icon/
  return (
    <svg
      className={className}
      viewBox="0 0 124 124"
      width={remSize}
      height={remSize}
    >
      <path
        d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"
        fill="currentColor"
      />
    </svg>
  );
};
