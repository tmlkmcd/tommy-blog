import type {
  TuringMachineBase,
  TuringMachineState,
} from "~/components/VisualAndExample/TuringMachine/types";
import { getComputedDetailsFromTape } from "~/components/VisualAndExample/TuringMachine/tmReducer";

const increment: TuringMachineBase<"r" | "l" | "fin", " " | "0" | "1"> = {
  name: "Increment",
  state: "r",
  tape: {
    0: "1",
    1: "0",
    2: "0",
    3: "1",
    4: "1",
    5: "1",
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
};

const divisibleBy3: TuringMachineBase<
  "r0" | "r1" | "r2" | "accept",
  " " | "0" | "1"
> = {
  name: "Divisible by 3",
  state: "r0",
  tape: {
    0: "1",
    1: "1",
    2: "1",
    3: "1",
    4: "0",
  },
  head: 0,
  table: {
    r0: {
      "0": { move: "right" },
      "1": { move: "right", newState: "r1" },
      " ": { newState: "accept" },
    },
    r1: {
      "0": { move: "right", newState: "r2" },
      "1": { move: "right", newState: "r0" },
      " ": {},
    },
    r2: {
      "0": { move: "right", newState: "r1" },
      "1": { move: "right", newState: "r2" },
      " ": {},
    },
    accept: {
      "0": {},
      "1": {},
      " ": {},
    },
  },
};

export const existingMachines: TuringMachineState[] = [
  increment,
  divisibleBy3,
].map((tm) => ({
  ...tm,
  computed: getComputedDetailsFromTape(tm),
}));
