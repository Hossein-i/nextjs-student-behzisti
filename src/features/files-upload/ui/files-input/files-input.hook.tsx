import { useRef, useState } from 'react';
import type { FileRejection } from 'react-dropzone';

export interface UseFilesInputProps {
  defaultValue?: Map<string, File> | null;
  value?: Map<string, File> | null;

  onValueChange?: (value: Map<string, File> | null) => void;
}

export const useFilesInput = (props: UseFilesInputProps) => {
  const { defaultValue = null, value, onValueChange } = props;

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [internalFiles, setInternalFiles] = useState<Map<string, File> | null>(
    defaultValue
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedFiles = value ?? internalFiles;
  const updateFiles = onValueChange ?? setInternalFiles;

  const handleFilesChange = (files: Map<string, File> | null) => {
    if (hiddenInputRef.current) {
      const dataTransfer = new DataTransfer();
      files?.forEach((v) => {
        dataTransfer.items.add(v);
      });
      hiddenInputRef.current.files = dataTransfer.files;
    }
    updateFiles(files);
  };

  const handleFilesDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    setErrorMessage(null);

    if (rejectedFiles.length > 0) {
      setErrorMessage('فایل های انتخاب شده معتبر نیستند.');

      if (hiddenInputRef.current) {
        hiddenInputRef.current.files = null;
      }

      updateFiles(null);

      return;
    }

    try {
      setIsLoading(true);
      const updatedFiles = new Map<string, File>(selectedFiles);

      acceptedFiles.forEach((file) => {
        updatedFiles.set(`${Date.now()}-${file.size}`, file);
      });

      handleFilesChange(updatedFiles);
    } catch (error) {
      setErrorMessage('خطا در پردازش فایل ها');
      console.error('[useFilesInput]: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    if (!selectedFiles) {
      return;
    }

    const updatedFiles = new Map(selectedFiles);
    updatedFiles.delete(fileId);

    if (updatedFiles.size === 0) {
      handleClearAllFiles();
      return;
    }

    handleFilesChange(updatedFiles);
  };

  const handleClearAllFiles = () => {
    handleFilesChange(null);
    setErrorMessage(null);
  };

  return {
    hiddenInputRef,
    selectedFiles,
    isLoading,
    errorMessage,
    updateFiles,
    handleFilesChange,
    handleFilesDrop,
    handleRemoveFile,
    handleClearAllFiles,
  };
};

export type UseFilesInputReturn = ReturnType<typeof useFilesInput>;
