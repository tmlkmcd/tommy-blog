import * as React from "react";
import classNames from "classnames";

interface Props {
  onClick?: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
  corrupt?: boolean;
  highlight?: boolean;
  type: "parity" | "data";
  reverse?: boolean;
}

export const Cell: React.FC<React.PropsWithChildren<Props>> = ({
  onClick,
  onMouseOver,
  onMouseOut,
  corrupt = false,
  type,
  highlight = false,
  reverse = false,
  children,
}) => {
  return (
    <button
      className={classNames(
        "box-border h-10 w-10 border bg-opacity-60 transition duration-150 sm:h-16 sm:w-16",
        reverse ? "border-l-0 last:border-l" : "border-r-0 last:border-r ",
        !corrupt && highlight && type === "parity" && "bg-info-600",
        !corrupt && highlight && type === "data" && "bg-success-600",
        corrupt && "bg-pasta-800"
      )}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </button>
  );
};

export const CellLabel: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isParity = (children as string)?.startsWith?.("P");
  return (
    <div
      className={classNames(
        "flex h-6 w-10 items-center justify-center text-sm text-iceColdStare-600 sm:w-16",
        isParity ? "text-info-600" : "text-success-600"
      )}
    >
      {children}
    </div>
  );
};
