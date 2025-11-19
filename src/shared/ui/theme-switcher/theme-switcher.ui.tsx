'use client';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { type ButtonProps, Ripple, useButton } from '@heroui/react';
import React, { forwardRef } from 'react';
import { useTernaryDarkMode } from 'usehooks-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeSwitcherProps extends ButtonProps {}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = forwardRef(
  (props, ref) => {
    const { ternaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode({
      localStorageKey: 'ternary-dark-mode',
    });

    const IconTheme =
      ternaryDarkMode === 'light'
        ? SunIcon
        : ternaryDarkMode === 'dark'
          ? MoonIcon
          : ComputerDesktopIcon;

    const {
      domRef,
      //   children,
      //   spinnerSize,
      //   spinner = <Spinner color="current" size={spinnerSize} />,
      //   spinnerPlacement,
      //   startContent,
      //   endContent,
      //   isLoading,
      disableRipple,
      getButtonProps,
      getRippleProps,
    } = useButton({
      ref,
      ...props,
      isIconOnly: true,
      onPress: toggleTernaryDarkMode,
    });
    const { ripples, onClear } = getRippleProps();

    return (
      <button ref={domRef} {...getButtonProps()}>
        {/* {startContent} */}
        {/* {isLoading && spinnerPlacement === "start" && spinner} */}
        {/* {children} */}
        {/* {isLoading && spinnerPlacement === "end" && spinner} */}
        {/* {endContent} */}
        <IconTheme className="h-4 w-4" />
        {!disableRipple && <Ripple ripples={ripples} onClear={onClear} />}
      </button>
    );
  }
);

ThemeSwitcher.displayName = 'ThemeSwitcherUI';
