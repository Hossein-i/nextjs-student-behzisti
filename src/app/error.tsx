'use client';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {
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
              <Button
                color="primary"
                variant="shadow"
                radius="full"
                onPress={reset}
                fullWidth
              >
                تلاش مجدد
              </Button>
              <Button
                as={Link}
                href="/"
                color="primary"
                variant="bordered"
                radius="full"
                fullWidth
              >
                بازگشت به صفحه اصلی
              </Button>
            </>
          }
        >
          <ExclamationCircleIcon className="h-32 w-32" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};

export default ErrorPage;
