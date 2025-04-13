import { Header } from '@/widgets/header/ui';
import { NavigationBar } from '@/widgets/navigation-bar/ui';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MyLayoutProps extends React.PropsWithChildren {}

const MyLayout: React.FC<MyLayoutProps> = async (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <NavigationBar />
      <main className="pb-16">{children}</main>
    </>
  );
};

export default MyLayout;
