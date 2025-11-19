import React from 'react';

import { Header } from '@/widgets/header/ui';
import { NavigationBar } from '@/widgets/navigation-bar/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AppLayoutProps extends React.PropsWithChildren {}

export const AppLayout: React.FC<AppLayoutProps> = async (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <NavigationBar />
      <main className="pb-16">{children}</main>
    </>
  );
};
