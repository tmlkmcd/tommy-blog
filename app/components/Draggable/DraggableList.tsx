import * as React from "react";
import { useDraggableField } from "~/hooks/useDraggableField";
import { rearrangeArray } from "~/data/rearrangeArray";
import { DraggableItem } from "~/components/Draggable/DraggableItem";
import type { List } from "~/components/Draggable/DraggableBase";
import { listCards } from "~/components/Draggable/DraggableBase";

export const DraggableList: React.FC = () => {
  const [list, setList] = React.useState<List[]>(() => [...listCards]);
  const { dragging, dragOver, draggableItemProps, dropZoneProps } =
    useDraggableField({
      fieldName: "list",
      onRearrange: (fromIndex, toIndex) => {
        setList((currentList) => {
          return rearrangeArray(currentList, fromIndex, toIndex);
        });
      },
    });

  return (
    <div className="flex flex-wrap gap-2">
      {list.map(({ name, id }, index) => (
        <DraggableItem
          key={name}
          startingIndex={id}
          dragging={index === dragging}
          dragOver={index === dragOver}
          {...draggableItemProps(index)}
          {...dropZoneProps(index)}
          className="flex-1"
          hasInput={id === 7}
        >
          {name}
        </DraggableItem>
      ))}
    </div>
  );
};
