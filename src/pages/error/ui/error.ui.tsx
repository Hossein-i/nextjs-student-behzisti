'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import React from 'react';

import { BackToHome } from '@/shared/ui/back-to-home';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { error, reset } = props;

  return (
    <section className="flex h-dvh items-center justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder
          header="خطا!"
          description="یک مشکل پیش آمد."
          action={
            <>
              <details className="w-full">
                <summary>توضیحات بیشتر</summary>
                {error.message}
              </details>
              <div className="space-y-2">
                <Button
                  color="primary"
                  variant="shadow"
                  radius="full"
                  onPress={reset}
                  fullWidth
                >
                  تلاش مجدد
                </Button>
                <BackToHome
                  color="primary"
                  variant="bordered"
                  radius="full"
                  fullWidth
                />
              </div>
            </>
          }
        >
          <ExclamationCircleIcon className="h-32 w-32" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};
