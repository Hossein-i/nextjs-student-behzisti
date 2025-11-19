'use client';

import { useMutation } from '@apollo/client/react';
import { Button, Form, Input, Link } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { PasswordResetRequest, passwordResetRequestSchema } from '../schemas';

import {
  passwordResetRequestDocument,
  PasswordResetRequestMutation,
  PasswordResetRequestMutationVariables,
} from '@/shared/api/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ForgetPasswordFormProps {}

export const ForgetPasswordForm: React.FC<ForgetPasswordFormProps> = () => {
  const [passwordResetRequest] = useMutation<
    PasswordResetRequestMutation,
    PasswordResetRequestMutationVariables
  >(passwordResetRequestDocument);
  const form = useForm<PasswordResetRequest>({
    defaultValues: { username: '' },
    mode: 'onTouched',
    resolver: zodResolver(passwordResetRequestSchema),
  });
  const { control, formState, handleSubmit } = form;
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<PasswordResetRequest> = async (data) => {
    const { username } = data;

    await passwordResetRequest({ variables: { nid: username } });
  };

  return (
    <Form className="block" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                label="نام کاربری"
                inputMode="decimal"
                color="primary"
                variant="bordered"
                radius="full"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                autoFocus
                {...field}
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            radius="full"
            isLoading={isSubmitting}
            fullWidth
          >
            بازیابی رمز عبور
          </Button>
          <div className="flex gap-2">
            <Button
              as={Link}
              href="/auth/sign-up"
              color="primary"
              variant="light"
              radius="full"
              isDisabled={isSubmitting}
              fullWidth
            >
              ثبت نام
            </Button>
            <Button
              as={Link}
              href="/auth"
              color="primary"
              variant="light"
              radius="full"
              isDisabled={isSubmitting}
              fullWidth
            >
              ورود
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
