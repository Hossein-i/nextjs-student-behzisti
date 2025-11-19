import { redirect } from 'next/navigation';
import React from 'react';

import { EducationLevelForm } from '@/features/education/ui';
import { auth } from '@/shared/config/auth';
import { BackButton } from '@/shared/ui/back-button';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NewEducationLevelPageProps {}

export const NewEducationLevelPage: React.FC<
  NewEducationLevelPageProps
> = async () => {
  const session = await auth();

  if (!session) {
    redirect('/auth');
  }

  return (
    <section className="container mx-auto p-4">
      <BlurredCard classNames={{ body: 'space-y-2' }}>
        <div>
          <BackButton radius="full" />
        </div>
        <Placeholder
          header="فرم ثبت مقطع تحصیلی جدید"
          description=""
        ></Placeholder>
        <EducationLevelForm defaultValues={{ studentId: session.user.id }} />
      </BlurredCard>
    </section>
  );
};
