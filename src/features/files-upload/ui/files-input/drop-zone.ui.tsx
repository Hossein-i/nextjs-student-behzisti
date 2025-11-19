'use client';

import { PhotoIcon } from '@heroicons/react/24/outline';
import { cn } from '@heroui/react';
import React from 'react';
import Dropzone, { type DropzoneProps } from 'react-dropzone';

import { Placeholder } from '@/shared/ui/placeholder';

export interface DropZoneProps extends DropzoneProps {
  className?: string;
  isInvalid?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = (props) => {
  const { children, className, isInvalid, ...restProps } = props;

  return (
    <Dropzone {...restProps}>
      {({
        isDragActive,
        isDragReject,
        isFocused,
        getRootProps,
        getInputProps,
        ...restState
      }) => (
        <>
          <div
            {...getRootProps({
              className: cn(
                'relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-content4-foreground text-content4-foreground transition-colors',
                isDragActive && 'border-success bg-success/10 text-success',
                (isInvalid || isDragReject) &&
                  'border-danger bg-danger/10 text-danger',
                isFocused && 'border-primary bg-primary/10 text-primary',
                className
              ),
            })}
          >
            <input {...getInputProps()} />
            <Placeholder
              header={
                isDragActive
                  ? 'فایل ها را رها کنید.'
                  : 'کلیک کنید یا فایل ها را اینجا بکشید.'
              }
            >
              <PhotoIcon className="h-16 w-16" />
            </Placeholder>
          </div>

          {children &&
            children({
              isDragActive,
              isDragReject,
              isFocused,
              getRootProps,
              getInputProps,
              ...restState,
            })}
        </>
      )}
    </Dropzone>
  );
};
