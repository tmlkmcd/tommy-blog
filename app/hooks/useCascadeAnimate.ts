import * as React from "react";

interface Params {
  limit: number;
  initialDelay?: number;
  delay?: number;
}

interface UseCascadeAnimate {
  animating: number;
  reset: () => void;
}

export const useCascadeAnimate = (params: Params): UseCascadeAnimate => {
  const { limit, initialDelay = 500, delay = 120 } = params;

  const [animating, setAnimating] = React.useState<number>(0);

  const reset = () => {
    setAnimating(0);
  };

  React.useEffect(() => {
    if (animating === 0) {
      setTimeout(() => {
        setAnimating(1);
      }, initialDelay);
      return;
    }

    if (animating < limit) {
      setTimeout(() => {
        setAnimating((prev) => prev + 1);
      }, delay);
    }
  }, [animating, delay, initialDelay, limit]);

  return {
    animating,
    reset,
  };
};
