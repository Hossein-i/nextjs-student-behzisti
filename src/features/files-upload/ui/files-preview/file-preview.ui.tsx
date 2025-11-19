'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

export interface FilePreviewProps {
  value: [string, File];

  onAction?: (key: React.Key, value: [string, File]) => void;
}

export const FilePreview: React.FC<FilePreviewProps> = (props) => {
  const { value, onAction } = props;
  const [id, file] = value;
  const { type } = file;
  const mimeTypePrefix = type?.split('/')[0];

  const [src, setSrc] = useState<string>('');
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const renderContent = useCallback(() => {
    switch (mimeTypePrefix) {
      case 'image':
        return (
          src && (
            <Image
              alt="پیش نمایش تصویر"
              src={src}
              className="object-cover"
              fill
            />
          )
        );
      default:
        return (
          <div className="bg-content3 flex h-full items-center justify-center">
            {mimeTypePrefix}
          </div>
        );
    }
  }, [mimeTypePrefix, src]);

  const handleAction = useCallback(
    (key: React.Key) => {
      if (!onAction) {
        return;
      }

      onAction(key, value);
    },
    [value, onAction]
  );

  useEffect(() => {
    if (!file) {
      return;
    }
    const objectURL = URL.createObjectURL(file);
    setSrc(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [file]);

  return (
    <div
      ref={setNodeRef}
      className="relative h-full w-min min-w-14 overflow-hidden rounded-lg"
      style={style}
      {...attributes}
      {...listeners}
    >
      {renderContent()}
      <div className="absolute start-1 top-1">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="h-6 min-h-fit w-6 min-w-fit"
              radius="full"
              isIconOnly
            >
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" onAction={handleAction}>
            <DropdownItem key="delete" color="danger">
              حذف
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
