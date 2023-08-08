export interface TuringMachineBase<
  States extends string = string,
  TapeValues extends string | number = string
> {
  name: string;
  tape: Record<number, TapeValues>;
  head: number;
  state: States;
  table: Record<States, Action<States, TapeValues>>;
  done?: boolean;
  history?: {
    head: number;
    tape: Record<number, TapeValues>;
  }[];
  description?: string;
}

export interface TuringMachineComputedDetails<
  States extends string = string,
  TapeValues extends string | number = string
> {
  tapeArray: (TapeValues | " ")[];
  tapeHead: number;
}

export interface TuringMachineState<
  States extends string = string,
  TapeValues extends string | number = string
> extends TuringMachineBase<States, TapeValues> {
  computed: TuringMachineComputedDetails<States, TapeValues>;
}

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
