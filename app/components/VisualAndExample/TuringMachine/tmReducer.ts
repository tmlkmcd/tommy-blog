import { existingMachines } from "~/components/VisualAndExample/TuringMachine/existingMachines";
import type {
  TuringMachineBase,
  TuringMachineComputedDetails,
  TuringMachineState,
} from "~/components/VisualAndExample/TuringMachine/types";

export enum TuringMachineActionType {
  STEP = "STEP",
  RESET = "RESET",
}

interface StepAction {
  type: TuringMachineActionType.STEP;
}

interface ResetAction {
  type: TuringMachineActionType.RESET;
  resetToMachine?: number;
}

type UpdateTuringMachineAction = StepAction | ResetAction;

export const turingMachineReducer = (
  state: TuringMachineState,
  action: UpdateTuringMachineAction
): TuringMachineState => {
  switch (action.type) {
    case TuringMachineActionType.STEP:
      return state.done ? state : takeStep(state);
    case TuringMachineActionType.RESET:
      const { resetToMachine } = action;
      const machine = {
        ...(existingMachines[resetToMachine || 0] || existingMachines[0]),
      };
      delete machine.done;
      return machine;
  }
};

function takeStep(machine: TuringMachineState): TuringMachineState {
  const { tape, head, state, table } = machine;
  const currentValue = tape[head] || " ";

  const action = table[state][currentValue];
  if (Object.keys(action).length === 0) {
    return { ...machine, done: true };
  }

  const { write, move, newState } = action;
  const newTape = { ...tape };
  if (write) {
    newTape[head] = write;
  }

  let newHead = head;
  if (move) {
    newHead = move === "right" ? head + 1 : head - 1;
  }

  const newMachine = {
    ...machine,
    tape: newTape,
    head: newHead,
    state: newState || state,
    history: [
      ...(machine.history || []),
      {
        head,
        tape: { ...tape },
      },
    ],
  };

  return {
    ...newMachine,
    computed: getComputedDetailsFromTape(newMachine),
  };
}

export function getComputedDetailsFromTape(
  tm: TuringMachineBase
): TuringMachineComputedDetails {
  const tapeIndices = Object.keys(tm.tape).map((k) => parseInt(k, 10));

  const minIndex = Math.min(...tapeIndices);
  const maxIndex = Math.max(...tapeIndices);

  const tapeArray = [...new Array(maxIndex - minIndex + 1)].map(
    (_, i) => tm.tape[i + minIndex] || " "
  );

  return {
    tapeArray,
    tapeHead: tm.head - minIndex,
  };
}
