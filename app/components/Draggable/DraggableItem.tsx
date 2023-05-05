import * as React from "react";
import classNames from "classnames";
import type { DraggableProps, DropZoneProps } from "~/hooks/useDraggableField";

interface Props {
  startingIndex: number;
  dragging: boolean;
  dragOver: boolean;
  blank?: boolean;
  className?: string;
}

export const DraggableItem: React.FC<
  React.PropsWithChildren<Props & DraggableProps & DropZoneProps>
> = ({
  startingIndex,
  dragging,
  dragOver,
  blank,
  className,
  children,
  ...draggable
}) => {
  return (
    <div
      {...draggable}
      draggable={!blank}
      className={classNames(
        "flex h-12 items-center justify-center whitespace-nowrap rounded border border-opacity-50 p-2 font-bold",
        startingIndex === 0 && "bg-iceColdStare-800",
        startingIndex === 1 && "bg-iceColdStare-700",
        startingIndex === 2 && "bg-iceColdStare-600",
        startingIndex === 3 && "bg-iceColdStare-500",
        startingIndex === 4 && "bg-iceColdStare-400",
        startingIndex === 5 && "bg-iceColdStare-300",
        startingIndex === 6 && "bg-iceColdStare-200",
        startingIndex === 7 && "bg-iceColdStare-100",
        blank ? "border-opacity-0 bg-opacity-0" : "cursor-grab",
        dragging && "opacity-50",
        dragOver && "border-dashed",
        className
      )}
    >
      {children}
    </div>
  );
};
