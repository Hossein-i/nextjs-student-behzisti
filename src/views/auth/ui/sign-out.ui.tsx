'use client';

import { SignOutForm } from '@/features/auth/ui';
import { BackToHome } from '@/shared/ui/back-to-home';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';
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
        <section className="max-w-lg">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="آیا اطمینان دارید که از حساب کاربری خود خارج میشوید؟"
            action={
              <div className="w-full space-y-2">
                <section className="flex gap-2">
                  <SignOutForm />
                </section>

                <section className="flex gap-2">
                  <BackToHome
                    color="primary"
                    variant="light"
                    radius="full"
                    fullWidth
                  />
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
