'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useTernaryDarkMode } from 'usehooks-ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UIProviderProps extends React.PropsWithChildren {}

export const UIProvider: React.FC<UIProviderProps> = (props) => {
  const { children } = props;

  const router = useRouter();

  const { isDarkMode } = useTernaryDarkMode({
    localStorageKey: 'ternary-dark-mode',
  });

  useEffect(() => {
    const html = document.getElementsByTagName('html').item(0);

    if (!html) {
      return;
    }

    html.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider
        placement="bottom-center"
        toastProps={{ radius: 'full' }}
      />
      {children}
    </HeroUIProvider>
  );
};
