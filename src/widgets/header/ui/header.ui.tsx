import { redirect } from 'next/navigation';
import React from 'react';

import { Navbar } from './navbar.ui';

import { auth } from '@/shared/config/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = async () => {
  const session = await auth();

  if (!session) {
    redirect('/auth');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const { token, ...user } = session.user;

  return <Navbar user={user} />;
};
