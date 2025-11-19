'use client';

import React from 'react';

import { ForgetPasswordForm } from '@/features/auth/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Logo } from '@/shared/ui/logo';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ForgetPasswordPageProps {}

export const ForgetPasswordPage: React.FC<ForgetPasswordPageProps> = () => {
  return (
    <section className="h-dvh p-4">
      <BlurredCard
        className="h-full max-w-3xl"
        classNames={{ body: 'flex-col items-center justify-center' }}
      >
        <section className="w-full max-w-lg">
          <Placeholder
            header="سامانه دانشجویی سازمان بهزیستی کشور"
            description="با نام کاربری خود می‌توانید رمز عبور خود را بازیابی کنید."
            action={
              <div className="w-full">
                <ForgetPasswordForm />
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
