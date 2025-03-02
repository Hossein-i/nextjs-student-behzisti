'use client';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <section className="flex h-dvh items-center justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder
          header="پیدا نشد!"
          description="صفحه مورد نظر شما وجود ندارد."
          action={
            <Button as={Link} href="/" color="primary" fullWidth>
              بازگشت به صفحه اصلی
            </Button>
          }
        >
          <QuestionMarkCircleIcon className="h-32 w-32" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};

export default NotFoundPage;
