'use client';

import { Button, Form, Input } from '@heroui/react';
import React, { useActionState } from 'react';
import { forgetPassword } from '../actions';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ForgetPasswordFormProps {}

export const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = () => {
  const [{ errors, message }, action, pending] = useActionState(
    forgetPassword,
    {
      errors: {},
      message: undefined,
    }
  );

  return (
    <Form action={action} validationErrors={errors} className="flex w-full">
      <Input
        type="text"
        name="username"
        label="نام کاربری"
        color="primary"
        variant="bordered"
        radius="full"
        autoFocus
      />
      <Button
        type="submit"
        color="primary"
        isLoading={pending}
        radius="full"
        fullWidth
      >
        بازیابی رمز عبور
      </Button>
      <p className="text-xs text-danger">{message}</p>
    </Form>
  );
};
