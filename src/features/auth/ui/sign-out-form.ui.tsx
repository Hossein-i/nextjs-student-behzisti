'use client';

import { Button, Form } from '@heroui/react';
import { signOut } from 'next-auth/react';
import React, { useActionState } from 'react';

import { apolloClient } from '@/shared/api/graphql';
import { BackToHome } from '@/shared/ui/back-to-home';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignOutFormProps {}

export const SignOutForm: React.FC<SignOutFormProps> = () => {
  const [, action, pending] = useActionState(async () => {
    apolloClient.clearStore();
    await signOut({ redirectTo: '/auth' });
  }, undefined);

  return (
    <Form className="block space-y-2" action={action}>
      <Button
        type="submit"
        color="primary"
        variant="shadow"
        radius="full"
        isLoading={pending}
        fullWidth
      >
        خروج
      </Button>
      <BackToHome
        color="primary"
        variant="light"
        radius="full"
        isDisabled={pending}
        fullWidth
      />
    </Form>
  );
};
