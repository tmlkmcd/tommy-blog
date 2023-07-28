import * as React from "react";
import classNames from "classnames";
import { ChevronRightIcon } from "~/icons/Chevron";
import { useHammingContext } from "~/components/ErrorCorrection/HammingCode/HammingContext";

export const HammingBitTable: React.FC = () => {
  const { bits, parityBits, highlighted, highlight, setHighlighted } =
    useHammingContext();

  const bitHLed = (bit: number) => {
    return highlighted.includes(bit) && highlighted.includes("b");
  };

  return (
    <div>
      <table className="info bordered mx-auto table max-w-[24rem] compact">
        <thead>
          <tr>
            <th>Parity</th>
            <th>Calculation</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={classNames(
              "cursor-pointer transition duration-150",
              highlighted.includes("p1") && "!bg-info-600"
            )}
            onMouseOver={() => highlight("p1")}
            onMouseOut={() => setHighlighted([])}
          >
            <td>P1</td>
            <td>
              <div className="flex items-center gap-1">
                <span className={classNames(bitHLed(2) && "font-bold")}>
                  B3
                </span>
                ^
                <span className={classNames(bitHLed(4) && "font-bold")}>
                  B5
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  B7
                </span>
                <ChevronRightIcon size="xs" />
                <span className={classNames(bitHLed(2) && "font-bold")}>
                  {bits[0] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(4) && "font-bold")}>
                  {bits[1] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  {bits[3] ?? "?"}
                </span>
              </div>
            </td>
            <td>{parityBits[0]}</td>
          </tr>
          <tr
            className={classNames(
              "cursor-pointer transition duration-150",
              highlighted.includes("p2") && "!bg-info-600"
            )}
            onMouseOver={() => highlight("p2")}
            onMouseOut={() => setHighlighted([])}
          >
            <td>P2</td>
            <td>
              <div className="flex items-center gap-1">
                <span className={classNames(bitHLed(2) && "font-bold")}>
                  B3
                </span>
                ^
                <span className={classNames(bitHLed(5) && "font-bold")}>
                  B6
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  B7
                </span>
                <ChevronRightIcon size="xs" />{" "}
                <span className={classNames(bitHLed(2) && "font-bold")}>
                  {bits[0] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(5) && "font-bold")}>
                  {bits[2] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  {bits[3] ?? "?"}
                </span>
              </div>
            </td>
            <td>{parityBits[1]}</td>
          </tr>
          <tr
            className={classNames(
              "cursor-pointer transition duration-150",
              highlighted.includes("p4") && "!bg-info-600"
            )}
            onMouseOver={() => highlight("p4")}
            onMouseOut={() => setHighlighted([])}
          >
            <td>P4</td>
            <td>
              <div className="flex items-center gap-1">
                <span className={classNames(bitHLed(4) && "font-bold")}>
                  B5
                </span>
                ^
                <span className={classNames(bitHLed(5) && "font-bold")}>
                  B6
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  B7
                </span>
                <ChevronRightIcon size="xs" />{" "}
                <span className={classNames(bitHLed(4) && "font-bold")}>
                  {bits[1] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(5) && "font-bold")}>
                  {bits[2] ?? "?"}
                </span>
                ^
                <span className={classNames(bitHLed(6) && "font-bold")}>
                  {bits[3] ?? "?"}
                </span>
              </div>
            </td>
            <td>{parityBits[2]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
