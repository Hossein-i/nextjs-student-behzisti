'use client';

import { useQuery } from '@apollo/client/react';
import { Button, Spinner } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

import { EducationLevelsTable } from '@/entities/education';
import {
  educationLevelsDocument,
  GetEducationLevelsQuery,
  GetEducationLevelsQueryVariables,
} from '@/shared/api/graphql';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { Text, Title } from '@/shared/ui/typography';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EducationLevelsPageProps {}

export const EducationLevelsPage: React.FC<EducationLevelsPageProps> = () => {
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
    else return <EducationLevelsTable educationLevels={data.getDetails} />;
  };

  return (
    <section className="container mx-auto p-4">
      <BlurredCard>
        <div className="space-y-4">
          <div>
            <Title className="text-center">اطلاعات مقاطع تحصیلی</Title>
          </div>
          <RenderContent />
          <div className="flex justify-center">
            <Button
              as={Link}
              href="/my/education/new"
              color="primary"
              variant="shadow"
              radius="full"
            >
              ثبت مقطع جدید
            </Button>
          </div>
        </div>
      </BlurredCard>
    </section>
  );
};
