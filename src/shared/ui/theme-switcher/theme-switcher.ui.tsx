'use client';

import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { type ButtonProps, Ripple, useButton } from '@heroui/react';
import { useTheme } from 'next-themes';
import React, { forwardRef, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ThemeSwitcherProps extends ButtonProps {}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = forwardRef(
  (props, ref) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const IconTheme =
      theme === 'system'
        ? ComputerDesktopIcon
        : theme === 'light'
          ? SunIcon
          : MoonIcon;

    const onSystemTheme = () => setTheme('system');
    const onLightTheme = () => setTheme('light');
    const onDarkTheme = () => setTheme('dark');
    const onSwitchTheme =
      theme === 'system'
        ? onLightTheme
        : theme === 'light'
          ? onDarkTheme
          : onSystemTheme;

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
      onPress: onSwitchTheme,
    });
    const { ripples, onClear } = getRippleProps();

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

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
