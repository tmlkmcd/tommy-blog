import * as React from "react";

export enum AvailableBanners {
  SNAX = "SNAX",
  SLJO = "SLJO",
  MEDIUM = "MEDIUM",
}

const banners: AvailableBanners[] = Object.values(AvailableBanners);

export const numberOfBanners = banners.length;

interface UseBannerContent {
  currentBanner: AvailableBanners;
  resetTimer: () => void;
  startTimer: () => void;
}

interface UseBannerContentParams {
  switchTimeout: number;
}

export const useBannerContent = (
  params: UseBannerContentParams
): UseBannerContent => {
  const { switchTimeout } = params;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const inMotionRef = React.useRef(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const setCurrentBanner = (index: number) => {
    setCurrentIndex(index % numberOfBanners);
  };

  const nextBanner = () => {
    setCurrentBanner(currentIndex + 1);
  };

  const previousBanner = () => {
    setCurrentBanner(currentIndex - 1);
  };

  const toggleAutomaticBannerChange = () => {
    if (inMotionRef.current && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    } else {
      startTimer();
    }

    inMotionRef.current = !inMotionRef.current;
  };

  const startTimer = () => {
    timeoutRef.current = setTimeout(() => {
      nextBanner();
    }, switchTimeout);
  };

  return {
    currentBanner: banners[currentIndex],
    startTimer,
    resetTimer: () => {},
  };
};
