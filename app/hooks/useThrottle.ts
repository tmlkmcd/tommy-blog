import * as React from "react";

export const useThrottle = (callback: () => void, delay: number) => {
  const lastCalledAt = React.useRef(0);

  return React.useCallback(() => {
    const now = Date.now();
    if (now - lastCalledAt.current > delay) {
      lastCalledAt.current = now;
      callback();
    }
  }, [callback, delay]);
};
