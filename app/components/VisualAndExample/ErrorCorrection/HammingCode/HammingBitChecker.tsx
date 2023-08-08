import * as React from "react";
import { useHammingContext } from "~/components/VisualAndExample/ErrorCorrection/HammingCode/HammingContext";
import classNames from "classnames";

export const HammingBitChecker: React.FC = () => {
  const { value, corrupt, bitArrayWithCorruption } = useHammingContext();

  const calculatedParity = [
    calculateParity({
      expectedBit: bitArrayWithCorruption[0],
      parityBits: bitArrayWithCorruption,
      indices: [2, 4, 6],
    }),
    calculateParity({
      expectedBit: bitArrayWithCorruption[1],
      parityBits: bitArrayWithCorruption,
      indices: [2, 5, 6],
    }),
    calculateParity({
      expectedBit: bitArrayWithCorruption[3],
      parityBits: bitArrayWithCorruption,
      indices: [4, 5, 6],
    }),
  ];

  const numCorruptions = corrupt.filter((c) => c).length;

  const allGood = calculatedParity.every(({ matches }) => matches);
  const syndromeVector = calculatedParity.map(({ matches }) =>
    matches ? 0 : 1
  ) as [number, number, number];

  const corruptedBit = calculateCorruptedBit(syndromeVector);
  const reconstructedBitArray = bitArrayWithCorruption.map((bit, i) => {
    if (i === corruptedBit) return bit ^ 1;
    return bit;
  });

  const reconstructedMessage: (string | undefined)[] = [
    reconstructedBitArray[2],
    reconstructedBitArray[4],
    reconstructedBitArray[5],
    reconstructedBitArray[6],
  ]
    .filter((bit) => typeof bit === "number")
    .map((bit) => bit.toString());

  const success = reconstructedMessage.every((bit, i) => bit === value[i]);

  return (
    <div className="mx-auto flex w-min max-w-fit flex-col gap-6">
      <table
        className={classNames(
          "bordered mx-auto table max-w-[24rem] compact",
          allGood ? "success" : "danger"
        )}
      >
        <thead>
          <tr>
            <th>Bit</th>
            <th>Value</th>
            <th>Calculation</th>
            <th>Actual Result</th>
          </tr>
        </thead>
        <tbody>
          {calculatedParity.map(
            ({ value, expectedBit, calcString, emoji }, i) => (
              <tr key={i}>
                <td>P{i + 1}</td>
                <td>{expectedBit}</td>
                <td>
                  <div className="flex items-center gap-1">
                    {calcString
                      .map<React.ReactNode>((s, j) => <span key={j}>{s}</span>)
                      .reduce((acc, el) => [acc, "^", el])}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{value}</span>
                    <span>{emoji}</span>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="flex flex-col gap-2 text-sm text-iceColdStare-800">
        <section>
          The syndrome vector is: (
          {calculatedParity
            .map(({ matches }) => (matches ? "0" : "1"))
            .join(", ")}
          )
        </section>

        {allGood && <section>No errors were found. Hooray!</section>}
        {!allGood && (
          <section>
            We can thus conclude was an error in bit{" "}
            {calculateCorruptedBit(syndromeVector) + 1}.
          </section>
        )}
        <section>
          <table
            className={classNames(
              "bordered mx-auto table max-w-[24rem] compact",
              success ? "success" : "danger"
            )}
          >
            <thead>
              <tr>
                <th>Original Message</th>
                <th>Reconstructed Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{value}</td>
                <td>{reconstructedMessage.join("")}</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="whitespace-normal">
                    {getConclusionMessage(
                      success,
                      numCorruptions,
                      syndromeVector
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const calculateParity = ({
  expectedBit,
  parityBits,
  indices,
}: {
  expectedBit: number;
  parityBits: number[];
  indices: [number, number, number];
}): {
  value: number;
  expectedBit: number;
  calcString: string[];
  matches: boolean;
  emoji: string;
} => {
  const value = indices
    .map((i) => parityBits[i])
    .reduce((acc, bit) => acc ^ bit, 0);

  return {
    value,
    expectedBit,
    calcString: indices.map((i) => `B${i + 1}`),
    matches: value === expectedBit,
    emoji: value === expectedBit ? "✅" : "❌",
  };
};

function calculateCorruptedBit(syndromeVector: [number, number, number]) {
  if (vectorEquals(syndromeVector, [1, 0, 0])) return 0;
  if (vectorEquals(syndromeVector, [0, 1, 0])) return 1;
  if (vectorEquals(syndromeVector, [0, 0, 1])) return 3;
  if (vectorEquals(syndromeVector, [1, 1, 0])) return 2;
  if (vectorEquals(syndromeVector, [1, 0, 1])) return 4;
  if (vectorEquals(syndromeVector, [0, 1, 1])) return 5;
  if (vectorEquals(syndromeVector, [1, 1, 1])) return 6;

  return -1;
}

function vectorEquals(
  v1: [number, number, number],
  v2: [number, number, number]
) {
  return v1.every((x, i) => x === v2[i]);
}

function getConclusionMessage(
  success: boolean,
  corruptions: number,
  syndromeVector: number[]
): string {
  if (success) {
    if (corruptions === 0) {
      return "No errors had to be corrected and the original message was regenerated successfully. 🎉";
    }

    return corruptions === 1
      ? "One error was corrected and the original message was regenerated successfully. 😎"
      : `The message was regenerated successfully, but with ${corruptions} errors, perhaps this was a coincidence? 🤔`;
  }

  if (syndromeVector.every((x) => x === 0)) {
    return `The message couldn't be regenerated but the receiver may still think it's correct.
    Though with ${corruptions} errors, this may be the least of our troubles. 😬`;
  }

  if (corruptions <= 1) {
    return `Couldn't regenerate the message, even with ${corruptions} errors. If you see this, please let Tommy know! 😅`;
  }

  return corruptions < 4
    ? `The message has ${corruptions} errors and could not be regenerated. 😭`
    : `The message could not be regenerated. ${corruptions} errors may be asking a little much! 😢`;
}
