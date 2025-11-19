'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

import { BackToHome } from '@/shared/ui/back-to-home';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotFoundPageProps {}

export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <section className="flex h-dvh items-center justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder
          header="پیدا نشد!"
          description="صفحه مورد نظر شما وجود ندارد."
          action={
            <BackToHome
              color="primary"
              variant="shadow"
              radius="full"
              fullWidth
            />
          }
        >
          <QuestionMarkCircleIcon className="h-32 w-32" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};
