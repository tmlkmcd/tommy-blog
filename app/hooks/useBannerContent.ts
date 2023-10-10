import * as React from "react";
import type { Banner } from "~/components/contentful/types";
import { useRootContext } from "~/RootContext";

interface UseBannerContent {
  currentBanner: Banner;
  startTimer: () => void;
}

interface UseBannerContentParams {
  switchTimeout: number;
  showingSomethingElse: boolean;
  defaultEnabled?: boolean;
}

export const useBannerContent = (
  params: UseBannerContentParams
): UseBannerContent => {
  const { banners } = useRootContext();
  const { switchTimeout, showingSomethingElse, defaultEnabled = true } = params;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const inMotionRef = React.useRef(defaultEnabled);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const nextBanner = React.useCallback(() => {
    setCurrentIndex((index) => (index + 1) % banners.length);
  }, []);

  const startTimer = React.useCallback(() => {
    intervalRef.current = setInterval(() => nextBanner(), switchTimeout);
  }, [nextBanner, switchTimeout]);

  React.useEffect(() => {
    if (showingSomethingElse) {
      setCurrentIndex(Math.floor(Math.random() * banners.length));

      inMotionRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      return;
    }

    inMotionRef.current = true;
    startTimer();
  }, [banners.length, showingSomethingElse, startTimer]);

  return {
    currentBanner: banners[currentIndex],
    startTimer,
  };
};

export function isCdnBanner(banner: unknown): banner is Banner {
  return (
    Object.prototype.hasOwnProperty.call(banner, "header") &&
    Object.prototype.hasOwnProperty.call(banner, "images")
  );
}
