'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { BackToHome } from '@/shared/ui/back-to-home';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthErrorPageProps {}

export const AuthErrorPage: React.FC<AuthErrorPageProps> = () => {
  return (
    <section className="flex h-dvh items-center justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder
          header="خطا!"
          description="یک مشکل پیش آمد."
          action={
            <BackToHome
              color="primary"
              variant="shadow"
              radius="full"
              fullWidth
            />
          }
        >
          <ExclamationCircleIcon className="h-32 w-32" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};
