import { getSession } from '@/features/auth/api';
import { defaultAuthRedirect } from '@/features/auth/constants';
import { redirect } from 'next/navigation';
import React from 'react';
import { Navbar } from './navbar.ui';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = async () => {
  const session = await getSession();

  if (!session.user) {
    redirect(defaultAuthRedirect);
  }

  return <Navbar user={session.user} />;
};
