'use client';

import { PasswordInput } from '@/shared/ui/password-input';
import { Button, Form, Input } from '@heroui/react';
import React, { useActionState } from 'react';
import { signIn } from '../actions';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = () => {
  const [state, action, pending] = useActionState(signIn, undefined);
  const { message, errors } = state || {};

  return (
    <Form action={action} validationErrors={errors} className="flex w-full">
      <Input
        inputMode="decimal"
        name="username"
        label="نام کاربری"
        color="primary"
        variant="bordered"
        radius="full"
        isDisabled={pending}
        autoFocus
      />
      <PasswordInput
        name="password"
        label="کلمه عبور"
        color="primary"
        variant="bordered"
        radius="full"
        isDisabled={pending}
      />
      <Button
        type="submit"
        color="primary"
        isLoading={pending}
        radius="full"
        fullWidth
      >
        ورود
      </Button>
      <p className="text-xs text-danger">{message}</p>
    </Form>
  );
};
