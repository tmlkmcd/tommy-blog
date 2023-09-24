import * as React from "react";

export enum AvailableBanners {
  SNAX = "SNAX",
  SLJO = "SLJO",
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
  showingSomethingElse: boolean;
  defaultEnabled?: boolean;
}

export const useBannerContent = (
  params: UseBannerContentParams
): UseBannerContent => {
  const { switchTimeout, showingSomethingElse, defaultEnabled = true } = params;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const inMotionRef = React.useRef(defaultEnabled);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const nextBanner = React.useCallback(() => {
    setCurrentIndex((index) => (index + 1) % numberOfBanners);
  }, []);

  const startTimer = React.useCallback(() => {
    intervalRef.current = setInterval(() => nextBanner(), switchTimeout);
  }, [nextBanner, switchTimeout]);

  React.useEffect(() => {
    if (showingSomethingElse) {
      setCurrentIndex(Math.floor(Math.random() * numberOfBanners));

      inMotionRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      return;
    }

    inMotionRef.current = true;
    startTimer();
  }, [showingSomethingElse, startTimer]);

  return {
    currentBanner: banners[currentIndex],
    startTimer,
    resetTimer: () => {},
  };
};

export function isAvailableBanner(
  banner: string | null
): banner is AvailableBanners {
  return banners.includes(banner as AvailableBanners);
}
