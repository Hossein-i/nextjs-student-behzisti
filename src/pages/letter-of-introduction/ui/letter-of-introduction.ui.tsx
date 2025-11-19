'use client';

import React from 'react';

import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LetterOfIntroductionPageProps {}

export const LetterOfIntroductionPage: React.FC<
  LetterOfIntroductionPageProps
> = () => {
  return (
    <section className="flex justify-center p-4">
      <BlurredCard className="max-w-xs" fullWidth>
        <Placeholder header="در حال توسعه..." />
      </BlurredCard>
    </section>
  );
};
