import React from 'react';

import { TermsByEducationLevelForm } from '@/features/education/ui';
import { BackButton } from '@/shared/ui/back-button';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

export interface NewTermByEducationLevelPageProps {
  params: Promise<{ eid: string }>;
}

export const NewTermByEducationLevelPage: React.FC<
  NewTermByEducationLevelPageProps
> = async (props) => {
  const { params } = props;
  const { eid } = await params;

  return (
    <section className="container mx-auto p-4">
      <BlurredCard classNames={{ body: 'space-y-2' }}>
        <div>
          <BackButton radius="full" />
        </div>
        <Placeholder header="فرم ثبت ترم جدید" description=""></Placeholder>
        <TermsByEducationLevelForm
          defaultValues={{ detail: eid, imagesNumber: [1, 2, 3] }}
        />
      </BlurredCard>
    </section>
  );
};
