'use client';

import { SignOutForm } from '@/features/auth/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignOutProps {}

export const SignOut: React.FC<SignOutProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-screen-md"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="max-w-lg space-y-4">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="آیا اطمینان دارید که از حساب کاربری خود خارج میشوید؟"
          >
            <Logo />
          </Placeholder>

          <section className="flex gap-2">
            <SignOutForm />
          </section>

          <section className="flex gap-2">
            <Button
              as={Link}
              href="/"
              color="primary"
              variant="light"
              radius="full"
              replace
              fullWidth
            >
              بازگشت به صفحه اصلی
            </Button>
          </section>
        </section>
      </BlurredCard>
    </section>
  );
};
