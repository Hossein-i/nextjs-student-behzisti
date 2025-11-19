'use client';

import { cn } from '@heroui/react';
import React from 'react';

import { DropZone, type DropZoneProps } from './drop-zone.ui';
import {
  useFilesInput,
  type UseFilesInputProps,
  type UseFilesInputReturn,
} from './files-input.hook';

export interface FilesInputProps extends UseFilesInputProps {
  name?: string;
  label?: string;
  className?: string;
  classNames?: Partial<{
    root: string;
    label: string;
  }>;
  errorMessage?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  dropZoneProps?: DropZoneProps;

  children?: (filesInput: UseFilesInputReturn) => React.ReactNode;
}

export const FilesInput: React.FC<FilesInputProps> = (props) => {
  const {
    defaultValue: defaultFiles,
    value: currentFiles,
    onValueChange: onFilesChange,
    name,
    label,
    className,
    classNames,
    errorMessage,
    isInvalid,
    isRequired,
    dropZoneProps,
    children,
  } = props;

  const {
    hiddenInputRef,
    errorMessage: error,
    handleFilesDrop,
    ...restFilesInput
  } = useFilesInput({
    defaultValue: defaultFiles,
    value: currentFiles,
    onValueChange: onFilesChange,
  });

  return (
    <section className={cn('space-y-2', classNames?.root, className)}>
      {label && (
        <label
          className={cn(
            'text-sm font-medium',
            classNames?.label,
            isInvalid && 'text-danger'
          )}
          htmlFor={name}
        >
          {label}
          {isRequired && <span className="text-danger mx-1">*</span>}
        </label>
      )}
      <input
        ref={hiddenInputRef}
        type="file"
        name={name}
        required={isRequired}
        className="hidden"
      />

      <DropZone
        {...dropZoneProps}
        onDrop={handleFilesDrop}
        isInvalid={isInvalid && !!(error || errorMessage)}
      />

      {isInvalid && (error || errorMessage) ? (
        <p className="text-danger-400 text-xs">{error || errorMessage}</p>
      ) : null}

      {children &&
        children({
          hiddenInputRef,
          errorMessage: error,
          handleFilesDrop,
          ...restFilesInput,
        })}
    </section>
  );
};
