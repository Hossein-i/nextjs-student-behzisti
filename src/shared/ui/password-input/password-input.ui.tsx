'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import {
  Button,
  type InputProps,
  useDisclosure,
  useInput,
} from '@heroui/react';
import React, { forwardRef } from 'react';

export interface PasswordInputProps extends InputProps {
  defaultShowPass?: boolean;
  showPass?: boolean;
  onShowPass?: (showPass?: boolean) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = forwardRef(
  (props, ref) => {
    const { defaultShowPass, showPass, onShowPass, ...restProps } = props;

    const { isOpen, onOpen, onClose } = useDisclosure({
      defaultOpen: defaultShowPass,
      isOpen: showPass,
      onChange: onShowPass,
    });
    const onToggle = isOpen ? onClose : onOpen;
    const Icon = isOpen ? EyeSlashIcon : EyeIcon;

    const {
      Component,
      label,
      domRef,
      description,
      startContent,
      shouldLabelBeOutside,
      shouldLabelBeInside,
      errorMessage,
      getBaseProps,
      getLabelProps,
      getInputProps,
      getInnerWrapperProps,
      getInputWrapperProps,
      getDescriptionProps,
      getErrorMessageProps,
    } = useInput({
      ...restProps,
      ref,
      type: isOpen ? 'text' : 'password',
    });

    const labelContent = <label {...getLabelProps()}>{label}</label>;

    const end = React.useMemo(() => {
      return (
        <Button
          variant="light"
          onPress={onToggle}
          radius={props.radius}
          isIconOnly
        >
          <Icon className="h-4 w-4" />
        </Button>
      );
    }, [Icon, onToggle, props.radius]);

    const innerWrapper = React.useMemo(() => {
      if (startContent || end) {
        return (
          <div {...getInnerWrapperProps()}>
            {startContent}
            <input {...getInputProps()} />
            {end}
          </div>
        );
      }

      return <input {...getInputProps()} />;
    }, [startContent, end, getInputProps, getInnerWrapperProps]);

    return (
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          tabIndex={0}
          {...getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
          onKeyDown={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && <div {...getDescriptionProps()}>{description}</div>}
        {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
      </Component>
    );
  }
);

PasswordInput.displayName = 'PasswordInputUI';
