'use client';

import { Button, Form } from '@heroui/react';
import React, { useActionState } from 'react';
import { signOut } from '../actions';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignOutFormProps {}

export const SignOutForm: React.FC<SignOutFormProps> = () => {
  const [, action, pending] = useActionState(signOut, undefined);

  return (
    <Form action={action} className="w-full">
      <Button
        type="submit"
        color="primary"
        radius="full"
        isLoading={pending}
        fullWidth
      >
        خروج
      </Button>
    </Form>
  );
};
