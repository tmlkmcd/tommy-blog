import * as React from "react";

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const lastCalledAt = React.useRef(0);

  return React.useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCalledAt.current > delay) {
        lastCalledAt.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
};
