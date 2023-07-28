import * as React from "react";
import classNames from "classnames";
import { Cell, CellLabel } from "~/components/ErrorCorrection/Cell";
import { useHammingContext } from "~/components/ErrorCorrection/HammingCode/HammingContext";

export const HammingCells: React.FC = () => {
  const {
    corrupt,
    bitArrayWithCorruption,
    toggleCellCorrupted,
    highlight,
    highlighted,
    setHighlighted,
    isEncoding,
  } = useHammingContext();

  const [reverse, setReverse] = React.useState<boolean>(false);

  return (
    <section className="mx-auto flex w-min flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-iceColdStare-600">
          {isEncoding
            ? "Mouseover to highlight"
            : "Click the bits to corrupt them"}
        </span>
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm text-iceColdStare-600">Reverse</span>
          <input
            type="checkbox"
            className="info switch"
            onChange={(ev) => setReverse(ev.target.checked)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className={classNames(
            "flex items-center justify-center",
            reverse ? "flex-row-reverse" : "flex-row"
          )}
        >
          <CellLabel>P1</CellLabel>
          <CellLabel>P2</CellLabel>
          <CellLabel>B3</CellLabel>
          <CellLabel>P4</CellLabel>
          <CellLabel>B5</CellLabel>
          <CellLabel>B6</CellLabel>
          <CellLabel>B7</CellLabel>
        </div>
        <div
          className={classNames(
            "flex items-center justify-center",
            reverse ? "flex-row-reverse" : "flex-row"
          )}
        >
          {bitArrayWithCorruption.map((bit, i) => (
            <Cell
              key={i}
              corrupt={corrupt[i]}
              type={[0, 1, 3].includes(i) ? "parity" : "data"}
              onClick={() => toggleCellCorrupted(i)}
              onMouseOver={() => highlight(i)}
              onMouseOut={() => setHighlighted([])}
              highlight={highlighted.includes(i)}
              reverse={reverse}
            >
              {bit}
            </Cell>
          ))}
        </div>
      </div>
    </section>
  );
};
