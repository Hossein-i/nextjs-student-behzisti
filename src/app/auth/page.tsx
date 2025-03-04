import { SignIn } from '@/views/auth/ui';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  return <SignIn />;
};

export default AuthPage;
