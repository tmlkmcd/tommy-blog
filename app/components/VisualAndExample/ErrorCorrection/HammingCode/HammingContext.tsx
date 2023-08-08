import * as React from "react";
import { randomBitString } from "~/components/VisualAndExample/ErrorCorrection/randomBitString";

type CorruptTuplet = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

const nothingIsCorrupt: CorruptTuplet = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

interface Props {
  isEncoding: boolean;
}

interface HammingContextValue {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  randomise: () => void;
  corrupt: CorruptTuplet;
  setCorrupt: React.Dispatch<React.SetStateAction<CorruptTuplet>>;
  toggleCellCorrupted: (index: number) => void;
  bits: number[];
  parityBits: number[];
  bitArray: number[];
  bitArrayWithCorruption: number[];
  isEncoding: boolean;
  highlight: (bit: number | string) => void;
  highlighted: (string | number)[];
  setHighlighted: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

const HammingContext = React.createContext<HammingContextValue | null>(null);

export const HammingProvider: React.FC<React.PropsWithChildren<Props>> = ({
  isEncoding,
  children,
}) => {
  const [value, setValue] = React.useState<string>("");
  const [corrupt, setCorrupt] = React.useState<CorruptTuplet>(nothingIsCorrupt);

  React.useEffect(() => {
    if (isEncoding) {
      setCorrupt(nothingIsCorrupt);
    } else {
      setValue((currentValue) => {
        let newValue = currentValue;
        while (newValue.length < 4) {
          newValue += "0";
        }
        return newValue;
      });
    }
  }, [isEncoding]);

  const randomise = React.useCallback(() => {
    setValue(randomBitString(4));
    setCorrupt(nothingIsCorrupt);
  }, []);

  const toggleCellCorrupted = React.useCallback(
    (index: number) => {
      if (isEncoding) return;

      setCorrupt((isCorrupt) => {
        return isCorrupt.map((isCorrupt, i) => {
          if (i === index) return !isCorrupt;
          return isCorrupt;
        }) as CorruptTuplet;
      });
    },
    [isEncoding]
  );

  const { bits, parityBits } = React.useMemo(() => {
    const bits = value.split("").map((bit) => parseInt(bit));
    const [b1, b2, b3, b4] = bits;

    return {
      bits,
      parityBits: [b1 ^ b2 ^ b4, b1 ^ b3 ^ b4, b2 ^ b3 ^ b4],
    };
  }, [value]);

  const bitArray = [
    parityBits[0],
    parityBits[1],
    bits[0],
    parityBits[2],
    bits[1],
    bits[2],
    bits[3],
  ];

  const bitArrayWithCorruption = bitArray.map((b, i) => {
    return flipIfCorrupt(b, corrupt[i]);
  });

  const [highlighted, setHighlighted] = React.useState<(string | number)[]>([]);

  const highlight = React.useCallback(
    (bit: number | string) => {
      if (!isEncoding) return;

      if (bit === 0) setHighlighted(["p1", 0, 2, 4, 6]);
      else if (bit === 1) setHighlighted(["p2", 1, 2, 5, 6]);
      else if (bit === 2) setHighlighted(["b", 2, "p1", "p2"]);
      else if (bit === 3) setHighlighted(["p4", 3, 4, 5, 6]);
      else if (bit === 4) setHighlighted(["b", 4, "p1", "p4"]);
      else if (bit === 5) setHighlighted(["b", 5, "p2", "p4"]);
      else if (bit === 6) setHighlighted(["b", 6, "p1", "p2", "p4"]);
      else if (bit === "p1") setHighlighted(["p1", 0, 2, 4, 6]);
      else if (bit === "p2") setHighlighted(["p2", 1, 2, 5, 6]);
      else if (bit === "p4") setHighlighted(["p4", 3, 4, 5, 6]);
      else console.warn("??");
    },
    [isEncoding]
  );

  const contextValue = {
    value,
    setValue,
    randomise,
    corrupt,
    setCorrupt,
    toggleCellCorrupted,
    bits,
    parityBits,
    bitArray,
    bitArrayWithCorruption,
    isEncoding,
    highlight,
    highlighted,
    setHighlighted,
  };

  return (
    <HammingContext.Provider value={contextValue}>
      {children}
    </HammingContext.Provider>
  );
};

export const useHammingContext = () => {
  const context = React.useContext(HammingContext);

  if (!context) {
    throw new Error(
      "[useHammingContext] must be used within a HammingProvider"
    );
  }

  return context;
};

function flipIfCorrupt(bit: number, corrupt: boolean): number {
  if (corrupt) return bit ^ 1;
  return bit;
}
