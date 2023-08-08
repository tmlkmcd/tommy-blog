import * as React from "react";
import {
  TuringMachineActionType,
  turingMachineReducer,
} from "~/components/TuringMachine/tmReducer";
import { existingMachines } from "~/components/TuringMachine/existingMachines";
import { useThrottle } from "~/hooks/useThrottle";
import classNames from "classnames";
import { Tape } from "~/components/TuringMachine/Tape";
import { TuringMachineIcon } from "~/icons/TuringMachineIcon";

const ANIMATION_DURATION = 700;
const THROTTLE_DURATION = ANIMATION_DURATION + 10;

export const TuringMachine: React.FC = () => {
  const [tm, tmDispatch] = React.useReducer(
    turingMachineReducer,
    existingMachines[0]
  );

  const playRef = React.useRef<(() => void) | null>(null);

  const move = useThrottle(
    () => tmDispatch({ type: TuringMachineActionType.STEP }),
    ANIMATION_DURATION
  );

  const reset = (index?: number) => {
    tmDispatch({
      type: TuringMachineActionType.RESET,
      resetToMachine: index,
    });
  };

  playRef.current = () => {
    if (tm.done) return;
    move();
    setTimeout(() => {
      playRef.current && playRef.current();
    }, THROTTLE_DURATION);
  };

  return (
    <div className="flex flex-col">
      <section>
        <button onClick={playRef.current}>move</button>
        <br />
        <button onClick={() => reset(1)}>reset</button>
        <br />
        <section
          className={classNames(
            "border border-black border-opacity-60 p-6",
            "overflow-hidden bg-white shadow-[inset_0_0_0.75rem_rgba(0,_0,_0,_0.6)]"
          )}
        >
          <section className="w-full pb-1 pt-2">
            <TuringMachineIcon
              className="relative left-2/4 -translate-x-2/4"
              size="xxl"
            />
          </section>
          <section className="relative left-2/4 mb-2 flex -translate-x-2/4 justify-center">
            <Tape tape={tm.computed.tapeArray} padding={15} head={tm.head} />
          </section>
        </section>
      </section>
      <section></section>
    </div>
  );
};
