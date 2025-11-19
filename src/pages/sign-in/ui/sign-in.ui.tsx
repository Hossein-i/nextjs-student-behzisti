'use client';

import React from 'react';

import { SignInForm } from '@/features/auth/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignInPageProps {}

export const SignInPage: React.FC<SignInPageProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-3xl"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="w-full max-w-lg">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="با نام کاربری و کلمه عبور برای ورود به کارتابل خود اقدام نمایید."
            action={
              <div className="w-full">
                <SignInForm />
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
