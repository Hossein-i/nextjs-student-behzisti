'use client';

import { SignInForm } from '@/features/auth/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-screen-md"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="max-w-lg space-y-4">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="با نام کاربری و کلمه عبور خود برای ورود به کارتابل خود اقدام نمایید."
            action={
              <div className="w-full">
                <section className="flex gap-2">
                  <SignInForm />
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
                    href="/auth/forget-password"
                    color="primary"
                    variant="light"
                    radius="full"
                    fullWidth
                  >
                    فراموشی رمز عبور
                  </Button>
                </section>
              </div>
            }
          >
            <Logo />
          </Placeholder>
        </section>
      </BlurredCard>
    </section>
  );
};
