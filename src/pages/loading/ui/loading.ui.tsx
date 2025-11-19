'use client';

import { Spinner } from '@heroui/react';
import React from 'react';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LoadingPageProps {}

export const LoadingPage: React.FC<LoadingPageProps> = () => {
  return (
    <section className="flex h-dvh items-center justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder header="لطفا صبر کنید...">
          <Spinner color="primary" />
        </Placeholder>
      </BlurredCard>
    </section>
  );
};
