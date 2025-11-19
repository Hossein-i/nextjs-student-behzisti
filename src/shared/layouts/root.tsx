import Link from 'next/link';
import React from 'react';

import { vazirmatn } from '../assets/fonts/vazirmatn';
import { BlurredCard } from '../ui/blurred-card';
import { Caption } from '../ui/typography';

import { AppProvider } from '@/app/providers';
import '@/app/styles';
import { Background } from '@/shared/ui/background';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootLayoutProps extends React.PropsWithChildren {}

export const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang="fa-IR" dir="rtl">
      <body className={vazirmatn.className}>
        <Background />
        <AppProvider>{children}</AppProvider>
        <footer>
          <div className="container mx-auto flex justify-center p-4">
            <BlurredCard>
              <Caption className="text-center">
                <span>ساخته شده با ❤️ توسط</span>{' '}
                <Link
                  href="https://hossein-i.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-75"
                >
                  Hossein-i
                </Link>
              </Caption>
            </BlurredCard>
          </div>
        </footer>
      </body>
    </html>
  );
};
