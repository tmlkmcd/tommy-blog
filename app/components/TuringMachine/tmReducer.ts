import { existingMachines } from "~/components/TuringMachine/existingMachines";

export type TuringMachineState<
  States extends string = string,
  TapeValues extends string | number = string
> = {
  name: string;
  tape: Record<number, TapeValues>;
  head: number;
  state: States;
  table: Record<States, Action<States, TapeValues>>;
  done?: boolean;
};

export type Action<
  States extends string,
  TapeValues extends string | number
> = Record<
  TapeValues,
  Partial<{
    write: TapeValues;
    move: "left" | "right";
    newState: States;
  }>
>;

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

  return {
    ...machine,
    tape: newTape,
    head: newHead,
    state: newState || state,
  };
}
