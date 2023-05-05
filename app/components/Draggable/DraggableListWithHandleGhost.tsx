import * as React from "react";
import type { List } from "~/components/Draggable/DraggableBase";
import { listCards } from "~/components/Draggable/DraggableBase";
import { useDraggableField } from "~/hooks/useDraggableField";
import { rearrangeArray } from "~/data/rearrangeArray";
import { DraggableItemWithHandle } from "~/components/Draggable/DraggableItemWithHandle";

export const DraggableListWithHandleGhost: React.FC = () => {
  const [listWithHandle, setListWithHandle] = React.useState<List[]>(() => [
    ...listCards,
  ]);

  const { dragging, dragOver, draggableItemProps, dropZoneProps } =
    useDraggableField({
      fieldName: "listWithHandle",
      onRearrange: (fromIndex, toIndex) => {
        setListWithHandle((currentList) => {
          return rearrangeArray(currentList, fromIndex, toIndex);
        });
      },
    });

  return (
    <div className="flex flex-wrap gap-2">
      {listWithHandle.map(({ name, id }, index) => (
        <DraggableItemWithHandle
          key={name}
          startingIndex={id}
          dragging={index === dragging}
          dragOver={index === dragOver}
          {...draggableItemProps(index, {
            ghost: <div className="rotate-12 p-4">moving {name}...</div>,
          })}
          {...dropZoneProps(index)}
          className="flex-1"
        >
          {name}
        </DraggableItemWithHandle>
      ))}
    </div>
  );
};
