import * as React from "react";
import type { List } from "~/components/Draggable/DraggableBase";
import { rearrangeArray } from "~/data/rearrangeArray";
import { useDraggableField } from "~/hooks/useDraggableField";
import { DraggableItem } from "~/components/Draggable/DraggableItem";
import { listCards } from "~/components/Draggable/DraggableBase";
import { BlankDropzone } from "~/components/Draggable/BlankDropzone";

export const DraggableMultipleLists: React.FC = () => {
  const [doubleList, setDoubleList] = React.useState<List[][]>(() => [
    [...listCards.slice(0, 4)],
    [...listCards.slice(4, 8)],
    [],
    [],
  ]);

  const changeList = (
    index: number,
    newIndex: number,
    startingListIndex: number,
    targetListIndex: number
  ) => {
    setDoubleList((currentList) => {
      if (startingListIndex === targetListIndex) {
        return currentList.map((list, listIndex) => {
          return listIndex === startingListIndex
            ? rearrangeArray(list, index, newIndex)
            : list;
        });
      }

      return currentList.map((list, listIndex) => {
        if (listIndex === startingListIndex) {
          return list.filter((_, i) => i !== index);
        }

        if (listIndex === targetListIndex) {
          const newList = [...list];
          newList.splice(newIndex, 0, currentList[startingListIndex][index]);

          return newList;
        }

        return list;
      });
    });
  };

  const { dragging, dragOver, draggableItemProps, dropZoneProps } =
    useDraggableField({
      fieldName: "doubleList",
      onRearrange: (
        fromIndex: { list: number; index: number },
        toIndex: { list: number; index: number }
      ) => {
        changeList(
          fromIndex.index,
          toIndex.index,
          fromIndex.list,
          toIndex.list
        );
      },
    });

  return (
    <div className="flex flex-wrap gap-4">
      {doubleList.map((list, listIndex) => (
        <div
          key={listIndex}
          className="flex flex-1 flex-col items-stretch justify-start gap-1 rounded border p-1"
        >
          {list.map(({ name, id }, index) => (
            <DraggableItem
              key={name}
              startingIndex={id}
              dragging={
                dragging?.list === listIndex && dragging?.index === index
              }
              dragOver={
                dragOver?.list === listIndex && dragOver?.index === index
              }
              blank={id === -1}
              {...draggableItemProps({ list: listIndex, index })}
              {...dropZoneProps({ list: listIndex, index })}
            >
              {name}
            </DraggableItem>
          ))}
          <BlankDropzone
            {...dropZoneProps({ list: listIndex, index: list.length })}
            dragOver={
              dragOver?.list === listIndex && dragOver?.index === list.length
            }
          />
        </div>
      ))}
    </div>
  );
};
