'use client';

import { useQuery } from '@apollo/client/react';
import { Spinner } from '@heroui/react';
import { notFound, useParams } from 'next/navigation';
import React from 'react';

import { EducationLevelForm } from '@/features/education/ui';
import {
  educationLevelsDocument,
  GetEducationLevelsQuery,
  GetEducationLevelsQueryVariables,
} from '@/shared/api/graphql';
import { BackButton } from '@/shared/ui/back-button';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { Text } from '@/shared/ui/typography';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditEducationLevelPageProps {}

export const EditEducationLevelPage: React.FC<
  EditEducationLevelPageProps
> = () => {
  const params = useParams();
  const eid = params?.eid.toString() || '';

  const { loading, error, data } = useQuery<
    GetEducationLevelsQuery,
    GetEducationLevelsQueryVariables
  >(educationLevelsDocument);

  const RenderContent = () => {
    if (loading)
      return (
        <Placeholder header="لطفا صبر کنید...">
          <Spinner color="primary" />
        </Placeholder>
      );
    else if (error || !data)
      return (
        <Text>{error?.message || 'Failed to fetch education levels'}</Text>
      );
    else {
      const educationLevel = data.getDetails.find((el) => el.id === eid);

      if (!educationLevel) {
        return notFound();
      }

      const defaultValues = {
        id: educationLevel.id,
        studentNumber: educationLevel.studentNumber,
      };
      return <EducationLevelForm defaultValues={defaultValues} isEditMode />;
    }
  };

  return (
    <section className="container mx-auto p-4">
      <BlurredCard classNames={{ body: 'space-y-2' }}>
        <div>
          <BackButton radius="full" />
        </div>
        <Placeholder
          header="فرم ویرایش مقطع تحصیلی"
          description=""
        ></Placeholder>
        <RenderContent />
      </BlurredCard>
    </section>
  );
};
