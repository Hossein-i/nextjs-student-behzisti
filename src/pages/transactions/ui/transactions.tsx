'use client';

import React from 'react';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TransactionsPageProps {}

export const TransactionsPage: React.FC<TransactionsPageProps> = () => {
  return (
    <section className="flex justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder header="در حال توسعه..." />
      </BlurredCard>
    </section>
  );
};
