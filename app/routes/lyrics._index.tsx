import * as React from "react";
import * as ReactDOM from "react-dom";
import { youllBeBack } from "~/lyrics/youllBeBack";
import { hotelCalifornia } from "~/lyrics/hotelCalifornia";
import classNames from "classnames";
import { brownEyedGirl } from "~/lyrics/brownEyedGirl";
import { pokemon } from "~/lyrics/pokemon";
import { youAndMeAndTheBottleMakesThree } from "~/lyrics/youAndMeAndTheBottleMakesThree";
import { comeOnEileen } from "~/lyrics/comeOnEileen";
import { youCanCallMeAl } from "~/lyrics/youCanCallMeAl";
import { youreTheOneThatIWant } from "~/lyrics/youreTheOneThatIWant";
import { jolene } from "~/lyrics/jolene";
import { valerie } from "~/lyrics/valerie";
import { takeOnMe } from "~/lyrics/takeOnMe";
import { livinOnAPrayer } from "~/lyrics/livinOnAPrayer";
import { mrBrightside } from "~/lyrics/mrBrightside";
import {
  bakerStreet,
  daftPunkMedley,
  dropsOfJupiter,
  feelingGood,
  inMyLife,
  moreThanWords,
  somethinStupid,
  superstition,
  tequila,
  themeFromSeinfeld,
  underPressure,
  youKnowMyName,
} from "~/lyrics/noLyrics";
import { useThrottle } from "~/hooks/useThrottle";
import { useLocation } from "react-router";

const songs = [
  dropsOfJupiter,
  moreThanWords,

  somethinStupid,
  inMyLife,
  feelingGood,
  hotelCalifornia,
  bakerStreet,
  superstition,
  underPressure,
  youKnowMyName,
  daftPunkMedley,
  youllBeBack,

  tequila,
  themeFromSeinfeld,
  pokemon,
  youAndMeAndTheBottleMakesThree,
  brownEyedGirl,
  // comeOnEileen,
  youCanCallMeAl,
  youreTheOneThatIWant,
  jolene,
  valerie,
  takeOnMe,
  livinOnAPrayer,
  mrBrightside,
];

const songList = songs.map(({ title }, index) => ({
  title: title.toLowerCase(),
  index,
}));

const THROTTLE_LIMIT = 400;

interface State {
  lyricIndex: number;
  songIndex: number;
  fade: boolean;
  showSongPicker: boolean;
}

export default function Index() {
  const [{ lyricIndex, songIndex, fade, showSongPicker }, setStateFull] =
    React.useState<State>({
      lyricIndex: -1,
      songIndex: 0,
      fade: true,
      showSongPicker: false,
    });

  const setState = (newState: Partial<State>) => {
    setStateFull((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const textSize = params.get("textSize");

  const mainRef = React.useRef<HTMLButtonElement>(null);

  const currentSong = songs[songIndex];
  let splitLyrics: string[] | null = null;
  if (currentSong.lyrics) {
    splitLyrics = currentSong.lyrics?.includes("\n\n")
      ? currentSong.lyrics.split("\n\n")
      : currentSong.lyrics.split("\n");
  }

  const goToPreviousSong = () => {
    if (songIndex <= 0) return;

    setState({
      lyricIndex: -1,
      fade: false,
      songIndex: songIndex - 1,
    });

    setTimeout(() => {
      setState({ fade: true });
    }, 100);
  };

  const goBack = useThrottle(() => {
    if (lyricIndex <= 0 && songIndex <= 0) return;

    if (lyricIndex >= 0) {
      setState({ lyricIndex: lyricIndex - 1 });
    } else {
      setState({
        lyricIndex: -1,
        fade: false,
        songIndex: songIndex - 1,
      });

      setTimeout(() => {
        setState({ fade: true });
      }, 100);
    }
  }, THROTTLE_LIMIT);

  const goToNextSong = () => {
    if (songIndex >= songs.length - 1) return;
    setState({ lyricIndex: -1, fade: false, songIndex: songIndex + 1 });

    setTimeout(() => {
      setState({ fade: true });
    }, 100);
  };

  const proceed = useThrottle((nextSong?: boolean) => {
    if (
      songIndex >= songs.length - 1 &&
      splitLyrics &&
      lyricIndex >= splitLyrics.length - 1
    ) {
      return;
    }

    if (splitLyrics && lyricIndex < splitLyrics.length - 1) {
      setState({ lyricIndex: lyricIndex + 1 });
    } else if (nextSong) {
      setState({
        lyricIndex: -1,
        fade: false,
        songIndex: songIndex + 1,
      });

      setTimeout(() => {
        setState({ fade: true });
      }, 100);
    }
  }, THROTTLE_LIMIT);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "PageUp") proceed();
      if (e.key === "PageDown") goBack();

      if (e.key === "Enter") proceed(true);
      if (e.key === "ArrowRight") proceed(true);
      if (mod(e) && (e.key === "ArrowLeft" || e.key === "ArrowUp")) {
        goToPreviousSong();
      }
      if (mod(e) && (e.key === "ArrowRight" || e.key === "ArrowDown")) {
        goToNextSong();
      }
      if (e.key === "Backspace" || e.key === "ArrowLeft") goBack();
      if (e.key === "Escape") setState({ showSongPicker: !showSongPicker });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const changeSong = (index: number) => {
    setState({
      songIndex: index,
      showSongPicker: false,
      fade: false,
      lyricIndex: -1,
    });

    setTimeout(() => {
      setState({ fade: true });
    }, 100);
  };

  return (
    <button
      className="relative flex h-full w-full flex-col items-stretch justify-stretch"
      onClick={() => proceed(true)}
      ref={mainRef}
    >
      <SongPicker
        changeSong={changeSong}
        showSongPicker={showSongPicker}
        toggle={(value?: boolean) => {
          const n = value ?? !showSongPicker;
          if (!n) {
            mainRef.current?.focus();
          }
          setState({ showSongPicker: n });
        }}
      />
      <div className="flex flex-row items-center justify-around p-4">
        <div
          className={classNames(
            "flex items-center",
            songIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
          )}
        >
          <img
            src={currentSong.albumArt}
            key={currentSong.albumArt}
            alt="Album Art"
            className="mx-auto max-h-[400px] p-4"
          />
          <div className="flex grow flex-col justify-center gap-8 p-4">
            <div className="flex flex-col gap-4">
              <h1 className="font-metamorphous text-5xl font-bold">
                {currentSong.title}
              </h1>
              <h2 className="font-metamorphous text-3xl font-semibold">
                {currentSong.artist}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow justify-center scroll-auto p-4 font-aleo">
        {splitLyrics?.map(
          (line, index) =>
            fade && (
              <p
                key={index}
                className={classNames(
                  "duration absolute flex flex-col gap-4 px-8 text-nobel-950 opacity-0 transition-[opacity]",
                  fade && "duration-[1000ms]",
                  index === lyricIndex && "opacity-100"
                )}
              >
                {line.split("\n").map((l, i) => {
                  if (l === "-") return null;
                  return (
                    <span
                      key={i}
                      className={classNames(
                        textSize === "1" && "text-2xl",
                        textSize === "2" && "text-3xl",
                        textSize === "3" && "text-4xl",
                        textSize === "4" && "text-5xl",
                        (textSize === "5" || !textSize) && "text-6xl",
                        textSize === "6" && "text-7xl",
                        textSize === "7" && "text-8xl",
                        textSize === "8" && "text-9xl"
                      )}
                    >
                      {l}
                    </span>
                  );
                })}
              </p>
            )
        )}
      </div>
    </button>
  );
}

function SongPicker({
  changeSong,
  showSongPicker,
  toggle,
}: {
  changeSong: (index: number) => void;
  showSongPicker: boolean;
  toggle: (newState?: boolean) => void;
}) {
  const [query, setQuery] = React.useState("");
  const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);
  const [stateBitwise, setStateBitwise] = React.useState(0);

  React.useEffect(() => {
    setWrapper(document.getElementById("asd"));
  }, []);

  if (!wrapper) return null;
  const filtered = songList.filter(({ title }) => title.includes(query));

  const onClick = () => {
    if (filtered.length === 1) {
      changeSong(filtered[0].index);
      setQuery("");
      toggle(false);
    }

    if (filtered.length > 1) {
      setStateBitwise(1);
    }

    setTimeout(() => {
      setStateBitwise(3);
    }, 5);

    setTimeout(() => {
      setStateBitwise(2);
    }, 10);

    setTimeout(() => {
      setStateBitwise(0);
    }, 500);
  };

  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed right-0 top-0 z-50 flex h-full w-[300px] flex-col gap-4 rounded border bg-white p-4 text-3xl transition-[all] duration-500",
        showSongPicker ? "translate-x-0" : "translate-x-full"
      )}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1 className="">Search song...</h1>
      <input
        value={query}
        className="w-full rounded border border-b-iceColdStare-800"
        type="text"
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          e.stopPropagation();
        }}
      />
      <button
        className={classNames(
          "rounded border border-b-iceColdStare-800 text-lg",
          stateBitwise & 1 ? "bg-[red]" : "bg-iceColdStare-400",
          stateBitwise & 2 && "transition-all duration-500"
        )}
        onClick={(e) => {
          onClick();
          e.stopPropagation();
        }}
      >
        go
      </button>
      <span>{filtered.length}</span>
    </div>,
    wrapper
  );
}

function mod(event: KeyboardEvent) {
  return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}
