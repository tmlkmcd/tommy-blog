import * as React from "react";
import type { DropZoneProps } from "~/hooks/useDraggableField";
import { PlusIcon } from "~/icons/PlusIcon";
import classNames from "classnames";

interface Props {
  dragOver: boolean;
}

export const BlankDropzone: React.FC<Props & DropZoneProps> = ({
  dragOver,
  ...dropZone
}) => {
  return (
    <div className="grow" {...dropZone}>
      <div
        className={classNames(
          "flex items-center justify-center rounded border border-dashed p-2",
          dragOver ? "opacity-30" : "opacity-0"
        )}
      >
        <PlusIcon className={dragOver ? "opacity-30" : "opacity-0"} />
      </div>
    </div>
  );
};
