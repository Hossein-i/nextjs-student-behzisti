'use client';

import { TermByEducationLevel } from '@/features/education/types';
import { TermsByEducationLevelTable } from '@/features/education/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface TermsByEducationLevelProps {
  termsByEducationLevel: TermByEducationLevel[];
}

export const TermsByEducationLevel: React.FC<TermsByEducationLevelProps> = (
  props
) => {
  const { termsByEducationLevel } = props;

  const router = useRouter();

  return (
    <section className="container mx-auto p-4">
      <BlurredCard className="" classNames={{ body: 'space-y-2' }}>
        <div>
          <Button
            startContent={
              <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
            }
            onPress={router.back}
          >
            بازگشت
          </Button>
        </div>

        <TermsByEducationLevelTable
          termsByEducationLevel={termsByEducationLevel}
        />
      </BlurredCard>
    </section>
  );
};
