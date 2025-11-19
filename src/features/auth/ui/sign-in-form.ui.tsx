'use client';

import { Button, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Authenticate, authenticateSchema } from '../schemas';

import { PasswordInput } from '@/shared/ui/password-input';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = () => {
  const form = useForm<Authenticate>({
    defaultValues: { username: '', password: '' },
    mode: 'onTouched',
    resolver: zodResolver(authenticateSchema),
  });
  const { control, formState, handleSubmit } = form;
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<Authenticate> = async (data) => {
    const { username, password } = data;

    await signIn('credentials', {
      redirectTo: '/my/dashboard',
      username,
      password,
    });
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
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { invalid, error } }) => (
              <PasswordInput
                label="کلمه عبور"
                color="primary"
                variant="bordered"
                radius="full"
                isInvalid={invalid}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
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
            ورود
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
              href="/auth/forget-password"
              color="primary"
              variant="light"
              radius="full"
              isDisabled={isSubmitting}
              fullWidth
            >
              فراموشی رمز عبور
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
