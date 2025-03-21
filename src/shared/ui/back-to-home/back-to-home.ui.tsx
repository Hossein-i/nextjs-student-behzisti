'use client';

import { type ButtonProps, Ripple, Spinner, useButton } from '@heroui/react';
import Link from 'next/link';
import React, { forwardRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BackToHomeProps extends ButtonProps {}

export const BackToHome: React.FC<BackToHomeProps> = forwardRef(
  (props, ref) => {
    const {
      Component = 'button',
      domRef,
      children = 'بازگشت به صفحه اصلی',
      spinnerSize,
      spinner = <Spinner color="current" size={spinnerSize} />,
      spinnerPlacement,
      startContent,
      endContent,
      isLoading,
      disableRipple,
      getButtonProps,
      getRippleProps,
    } = useButton({ ref, ...props, as: Link, href: '/' });
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

BackToHome.displayName = 'ThemeSwitcherUI';
