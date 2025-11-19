'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { type ButtonProps, Ripple, Spinner, useButton } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BackButtonProps extends ButtonProps {}

export const BackButton: React.FC<BackButtonProps> = forwardRef(
  (props, ref) => {
    const router = useRouter();

    const {
      Component = 'button',
      domRef,
      children = 'بازگشت',
      spinnerSize,
      spinner = <Spinner color="current" size={spinnerSize} />,
      spinnerPlacement,
      startContent,
      endContent,
      isLoading,
      disableRipple,
      getButtonProps,
      getRippleProps,
    } = useButton({
      ref,
      onPress: () => router.back(),
      startContent: <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />,
      ...props,
    });
    const { ripples, onClear } = getRippleProps();

    return (
      <Component ref={domRef} {...getButtonProps()}>
        {startContent}
        {isLoading && spinnerPlacement === 'start' && spinner}
        {children}
        {isLoading && spinnerPlacement === 'end' && spinner}
        {endContent}
        {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
      </Component>
    );
  }
);

BackButton.displayName = 'ThemeSwitcherUI';
