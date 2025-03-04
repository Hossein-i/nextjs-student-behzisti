'use client';

import { ForgetPasswordForm } from '@/features/auth/ui/forget-password.ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ForgetPasswordProps {}

export const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-screen-md"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="max-w-lg space-y-4">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="با نام کاربری خود می‌توانید رمز عبور خود را بازیابی کنید."
          >
            <Logo />
          </Placeholder>

          <section className="flex gap-2">
            <ForgetPasswordForm />
          </section>

          <section className="flex gap-2">
            <Button
              as={Link}
              href="/auth/sign-up"
              color="primary"
              variant="light"
              radius="full"
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
              fullWidth
            >
              ورود
            </Button>
          </section>
        </section>
      </BlurredCard>
    </section>
  );
};
