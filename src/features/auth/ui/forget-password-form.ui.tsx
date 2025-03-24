'use client';

import { Button, Form, Input } from '@heroui/react';
import React, { useActionState } from 'react';
import { passwordResetRequest } from '../actions';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ForgetPasswordFormProps {}

export const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = () => {
  const [state, action, pending] = useActionState(
    passwordResetRequest,
    undefined
  );
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
      <Button
        type="submit"
        color="primary"
        variant="shadow"
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
