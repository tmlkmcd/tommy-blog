import * as React from "react";
import type { TuringMachineState } from "~/components/TuringMachine/tmReducer";
import {
  TuringMachineActionType,
  turingMachineReducer,
} from "~/components/TuringMachine/tmReducer";
import { existingMachines } from "~/components/TuringMachine/existingMachines";
import { PlayIcon } from "~/icons/PlayIcon";

export const TuringMachine: React.FC = () => {
  const [tm, tmDispatch] = React.useReducer(
    turingMachineReducer,
    existingMachines[0]
  );

  visualizeTuringMachine(tm);

  const move = () => {
    tmDispatch({
      type: TuringMachineActionType.STEP,
    });
  };

  const reset = (index?: number) => {
    tmDispatch({
      type: TuringMachineActionType.RESET,
      resetToMachine: index,
    });
  };

  return (
    <div className="flex flex-col">
      <section>
        <button onClick={move}>move</button>
        <br />
        <button onClick={() => reset()}>reset</button>
        <br />
        <section></section>
        <section>
          <PlayIcon />
        </section>
      </section>
      <section></section>
    </div>
  );
};

function visualizeTuringMachine(m: TuringMachineState) {
  if (m.done) {
    console.log("DONE");
    return;
  }
  console.log(Object.values(m.tape).join("-"));
  console.log("  ".repeat(m.head) + "^");
}
