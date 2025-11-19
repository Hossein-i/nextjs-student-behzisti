import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

export interface UseFilesPreviewsProps {
  files?: Map<string, File> | null;

  onFilesChange?: (value: Map<string, File> | null) => void;
}

export const useFilesPreviews = (props: UseFilesPreviewsProps) => {
  const { files, onFilesChange } = props;

  const [draggedItemId, setDraggedItemId] = useState<
    string | number | undefined
  >();

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItemId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) {
      return;
    }

    if (!onFilesChange) {
      return;
    }

    const filesArray = Array.from(files || new Map());
    const sourceIndex = filesArray.findIndex(([id]) => active.id === id);
    const targetIndex = filesArray.findIndex(([id]) => over?.id === id);
    const reorderedArray = arrayMove(filesArray, sourceIndex, targetIndex);
    onFilesChange(new Map(reorderedArray));

    setDraggedItemId(undefined);
  };

  return { draggedItemId, handleDragStart, handleDragEnd };
};

export type UseFilesPreviewsReturn = ReturnType<typeof useFilesPreviews>;
