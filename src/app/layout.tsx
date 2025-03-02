import { AppProvider } from '@/shared/providers';
import '@/shared/styles';
import { Background } from '@/shared/ui/background';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import React from 'react';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'سامانه دانشجویی سازمان بهزیستی کشور',
  description:
    'برای ثبت اطلاعات ترم خود چنانچه نام کاربری و کلمه عبور ندارید، از بخش زیر اقدام به دریافت نام کاربری و کلمه عبور نمایید و در غیر این صورت با نام کاربری و کلمه عبور خود برای ورود به کارتابل خود اقدام نمایید.',
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RootLayoutProps extends React.PropsWithChildren {}

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;

  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`${vazirmatn.className}`}>
        <Background />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
