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
  brownEyedGirl,
  pokemon,
  youAndMeAndTheBottleMakesThree,
  comeOnEileen,
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

const THROTTLE_LIMIT = 100;

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
    >
      <SongPicker
        changeSong={changeSong}
        showSongPicker={showSongPicker}
        currentSongIndex={songIndex}
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
                  "duration absolute flex flex-col gap-4 px-8 text-6xl text-nobel-950 opacity-0 transition-[opacity]",
                  fade && "duration-[1000ms]",
                  index === lyricIndex && "opacity-100"
                )}
              >
                {line.split("\n").map((l, i) => {
                  if (l === "-") return null;
                  return <span key={i}>{l}</span>;
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
  currentSongIndex,
}: {
  changeSong: (index: number) => void;
  showSongPicker: boolean;
  currentSongIndex: number;
}) {
  const [query, setQuery] = React.useState("");
  const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setWrapper(document.getElementById("asd"));
  }, []);

  if (!wrapper) return null;

  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed right-0 top-0 z-50 flex h-full w-[300px] flex-col gap-4 rounded border bg-white p-4 text-3xl transition-[all] duration-500",
        showSongPicker ? "translate-x-0" : "translate-x-full"
      )}
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
      <div className="flex flex-col gap-1">
        {songList
          .filter(({ title }) => title.includes(query))
          .map(({ title, index }) => (
            <button
              type="button"
              className={classNames(
                "border-top border-top-iceColdStare-800 text-lg underline",
                index === currentSongIndex && "font-bold"
              )}
              onClick={(event) => {
                changeSong(index);
                event.preventDefault();
                event.stopPropagation();
              }}
              key={index}
            >
              {title}
            </button>
          ))}
      </div>
    </div>,
    wrapper
  );
}

function mod(event: KeyboardEvent) {
  return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}
