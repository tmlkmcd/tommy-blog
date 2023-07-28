import * as React from "react";
import { HammingBitTable } from "~/components/ErrorCorrection/HammingCode/HammingBitTable";
import { useHammingContext } from "~/components/ErrorCorrection/HammingCode/HammingContext";
import { HammingBitChecker } from "~/components/ErrorCorrection/HammingCode/HammingBitChecker";
import { HammingCells } from "~/components/ErrorCorrection/HammingCode/HammingCells";

export const HammingCode: React.FC = () => {
  const { value, setValue, randomise, isEncoding } = useHammingContext();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-xl font-bold md:text-2xl lg:text-3xl">
          Hamming Codes
        </span>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <button onClick={() => randomise()} className="info btn solid">
            Randomise
          </button>
          <input
            type="text"
            pattern="^[0-1]{0,4}$"
            value={value}
            onChange={(ev) => {
              setValue((val) =>
                ev.target.validity.valid ? ev.target.value : val
              );
            }}
            placeholder="0000"
            className="success input w-[8rem] p-2 tracking-[1rem]"
            readOnly={!isEncoding}
          />
        </div>
      </section>
      <HammingCells />

      {isEncoding ? <HammingBitTable /> : <HammingBitChecker />}
    </div>
  );
};
