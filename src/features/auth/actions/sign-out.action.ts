'use server';
import { redirect } from 'next/navigation';
import { getSession } from '../api';
import { defaultAuthRedirect } from '../constants';

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect(defaultAuthRedirect);
};
