import * as React from "react";
import classNames from "classnames";

interface Props {
  tape: (number | string)[];
  padding?: number;
  head?: number;
}

export const Tape: React.FC<Props> = React.memo(
  ({ tape, padding = 0, head = 0 }) => {
    const cells = [
      ...new Array(padding + tape.length - 1),
      ...tape,
      ...new Array(padding),
    ];

    const right = `${head * 4}rem`;

    return (
      <div
        className="relative m-auto flex transition-[right] duration-700"
        style={{ right }}
      >
        {cells.map((v, i) => (
          <Cell key={i} value={v} />
        ))}
      </div>
    );
  },
  ({ tape }, { tape: newTape }) => {
    console.log(tape === newTape);
    return tape === newTape;
  }
);

interface CellHandle {
  pulse: () => Promise<void>;
}

const Cell: React.ForwardRefRenderFunction<
  CellHandle,
  { value: string | number }
> = ({ value }, forwardedRef) => {
  const [isHighlighted, setIsHighlighted] = React.useState<boolean>(false);
  const [fading, setFading] = React.useState<
    Partial<{ fadingOut: boolean; fadingIn: boolean }>
  >({});

  const firstRender = React.useRef(true);
  const [renderValue, setRenderValue] = React.useState(value);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setIsHighlighted(true);

    setTimeout(() => {
      setIsHighlighted(false);
    }, 500);

    setFading({ fadingOut: true });

    setTimeout(() => {
      setRenderValue(value);
      setFading({ fadingIn: true });

      setTimeout(() => {
        setFading({});
      }, 210);
    }, 210);
  }, [value]);

  return (
    <div
      className={classNames(
        "box-border h-16 w-16 border border-r-0 border-black bg-opacity-60 transition duration-150 last:border-r",
        isHighlighted && "bg-lightMint-100"
      )}
    >
      <div
        className={classNames(
          "flex h-16 w-16 items-center justify-center text-xl",
          fading.fadingIn && "animate-fade-in",
          fading.fadingOut && "animate-fade-out"
        )}
      >
        {renderValue}
      </div>
    </div>
  );
};
