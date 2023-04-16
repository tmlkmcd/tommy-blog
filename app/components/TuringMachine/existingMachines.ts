import type { TuringMachineState } from "~/components/TuringMachine/tmReducer";

export const existingMachines: TuringMachineState[] = [
  {
    name: "Increment",
    state: "r",
    tape: {
      0: "1",
      1: "1",
      2: "1",
      3: "0",
    },
    head: 0,
    table: {
      r: {
        "0": { move: "right" },
        "1": { move: "right" },
        " ": { move: "left", newState: "l" },
      },
      l: {
        "0": { write: "1", newState: "fin" },
        "1": { write: "0", move: "left" },
        " ": { write: "1", newState: "fin" },
      },
      fin: {
        "0": {},
        "1": {},
        " ": {},
      },
    },
  } as TuringMachineState<"r" | "l" | "fin", " " | "0" | "1">,
];
