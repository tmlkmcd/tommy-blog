import * as React from "react";
import { type DragEventHandler } from "react";
import ReactDOM from "react-dom/client";

interface DraggableFieldParams<T> {
  fieldName: string;
  onRearrange: (fromIndex: T, toIndex: T) => void;
}

export interface DraggableProps {
  draggable: true;
  onDragStart: DragEventHandler;
}

export interface DropZoneProps {
  onDragOver: DragEventHandler;
  onDragEnd: DragEventHandler;
  onDragLeave: DragEventHandler;
  onDrop: DragEventHandler;
}

interface DraggableField<T> {
  dragging: T | null;
  dragOver: T | null;
  draggableItemProps: (
    current: T,
    options?: Partial<{
      ghost: React.ReactElement;
    }>
  ) => DraggableProps;
  dropZoneProps: (current: T) => DropZoneProps;
}

export const useDraggableField = <T = number>({
  fieldName,
  onRearrange,
}: DraggableFieldParams<T>): DraggableField<T> => {
  const dragField = React.useRef<string>();

  const [dragging, setDragging] = React.useState<T | null>(null);
  const [dragOver, setDragOver] = React.useState<T | null>(null);

  const dragImage = React.useRef<Element>();

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: T,
    ghost?: React.ReactElement
  ) => {
    e.stopPropagation();
    dragField.current = fieldName;
    setDragging(index);

    if (!ghost) return;

    const ghostWrapper = document.createElement("div");
    ghostWrapper.style.position = "absolute";
    ghostWrapper.style.transform = "translate(-10000px, -10000px)";
    ghostWrapper.style.zIndex = "-1";
    ghostWrapper.setAttribute("id", "drag-ghost");

    // React version note - the above has been updated for React 18;
    // previous versions of React
    const root = ReactDOM.createRoot(ghostWrapper);
    root.render(ghost);
    document.body.appendChild(ghostWrapper);
    e.dataTransfer.setDragImage(ghostWrapper, 0, 0);

    dragImage.current = ghostWrapper;
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: T) => {
    e.preventDefault();

    // if identifier type <T> is not a primitive, this comparison needs to be
    // adapted
    if (index === dragging || dragField.current !== fieldName) return;
    if (dragging !== null) setDragOver(index);
  };

  const onDragEnd = () => {
    setDragging(null);
    setDragOver(null);
    dragImage.current?.remove();
  };

  const onDragLeave = () => {
    setDragOver(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: T) => {
    e.preventDefault();
    setDragging(null);
    setDragOver(null);
    dragImage.current?.remove();

    // if identifier type <T> is not a primitive, this comparison needs to be
    // adapted
    if (index === dragging || dragging === null) return;

    onRearrange(dragging, index);
  };

  return {
    dragging,
    dragOver,
    draggableItemProps: (index: T, options = {}) => {
      return {
        draggable: true,
        onDragStart: (e: React.DragEvent<HTMLDivElement>) =>
          onDragStart(e, index, options.ghost),
      };
    },
    dropZoneProps: (index: T) => {
      return {
        onDragOver: (e: React.DragEvent<HTMLDivElement>) =>
          onDragOver(e, index),
        onDragEnd,
        onDragLeave,
        onDrop: (e: React.DragEvent<HTMLDivElement>) => onDrop(e, index),
      };
    },
  };
};
