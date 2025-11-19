'use client';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { cn, ScrollShadow } from '@heroui/react';
import React from 'react';

import type { FilePreviewProps } from './file-preview.ui';
import {
  useFilesPreviews,
  type UseFilesPreviewsProps,
} from './files-preview.hook';

export interface FilesPreviewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    UseFilesPreviewsProps {
  children: (value: [string, File]) => React.ReactElement<FilePreviewProps>;
}

export const FilesPreview: React.FC<FilesPreviewProps> = (props) => {
  const { className, children, files, onFilesChange, ...restProps } = props;

  const { draggedItemId, handleDragEnd, handleDragStart } = useFilesPreviews({
    files,
    onFilesChange,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={Array.from(files ?? new Map()).map((item) => item[0])}
        strategy={horizontalListSortingStrategy}
      >
        <ScrollShadow orientation="horizontal">
          <div
            className={cn('flex h-14 items-center gap-1', className)}
            {...restProps}
          >
            {!files || files.size === 0 ? (
              <p className="text-foreground-400 w-full text-center">
                موردی انتخاب نشده است.
              </p>
            ) : (
              files
                .entries()
                .toArray()
                .map((item) => (
                  <React.Fragment key={item[0]}>
                    {children(item)}
                  </React.Fragment>
                ))
            )}
          </div>
        </ScrollShadow>
      </SortableContext>
      <DragOverlay>
        {files && draggedItemId
          ? children([
              draggedItemId.toString(),
              files.get(draggedItemId.toString())!,
            ])
          : null}
      </DragOverlay>
    </DndContext>
  );
};
