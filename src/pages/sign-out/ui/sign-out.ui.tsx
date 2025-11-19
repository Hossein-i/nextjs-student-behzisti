'use client';

import React from 'react';

import { SignOutForm } from '@/features/auth/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SignOutPageProps {}

export const SignOutPage: React.FC<SignOutPageProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-3xl"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="w-full max-w-lg">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="آیا اطمینان دارید که از حساب کاربری خود خارج میشوید؟"
            action={
              <div className="w-full">
                <SignOutForm />
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
