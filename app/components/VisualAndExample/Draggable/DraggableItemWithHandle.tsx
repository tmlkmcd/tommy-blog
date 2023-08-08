import * as React from "react";
import classNames from "classnames";
import type { DraggableProps, DropZoneProps } from "~/hooks/useDraggableField";
import { DragHandleIcon } from "~/icons/DragHandleIcon";

interface Props {
  startingIndex: number;
  dragging: boolean;
  dragOver: boolean;
  className?: string;
}

export const DraggableItemWithHandle: React.FC<
  React.PropsWithChildren<Props & DraggableProps & DropZoneProps>
> = ({
  startingIndex,
  dragging,
  dragOver,
  className,
  children,
  ...draggableProps
}) => {
  const { onDragStart, onDragEnd, onDragLeave, onDragOver, onDrop } =
    draggableProps;
  return (
    <div
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={classNames(
        "flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded border border-opacity-50 p-2 font-bold",
        startingIndex === 0 && "bg-iceColdStare-800",
        startingIndex === 1 && "bg-iceColdStare-700",
        startingIndex === 2 && "bg-iceColdStare-600",
        startingIndex === 3 && "bg-iceColdStare-500",
        startingIndex === 4 && "bg-iceColdStare-400",
        startingIndex === 5 && "bg-iceColdStare-300",
        startingIndex === 6 && "bg-iceColdStare-200",
        startingIndex === 7 && "bg-iceColdStare-100",
        dragging && "opacity-50",
        dragOver && "border-dashed",
        className
      )}
    >
      <div draggable onDragStart={onDragStart} className="cursor-grab">
        <DragHandleIcon />
      </div>{" "}
      {children}
    </div>
  );
};
