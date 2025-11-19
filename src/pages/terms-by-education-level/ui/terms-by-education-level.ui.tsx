'use client';

import { useQuery } from '@apollo/client/react';
import { Button, Spinner } from '@heroui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

import { TermsByEducationLevelTable } from '@/entities/term';
import {
  GetTermsByEducationLevelQuery,
  GetTermsByEducationLevelQueryVariables,
  termsByEducationLevelDocument,
} from '@/shared/api/graphql';
import { BackButton } from '@/shared/ui/back-button';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { Text, Title } from '@/shared/ui/typography';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TermsByEducationLevelPageProps {}

export const TermsByEducationLevelPage: React.FC<
  TermsByEducationLevelPageProps
> = () => {
  const params = useParams();
  const eid = params?.eid.toString() || '';
  const { loading, error, data } = useQuery<
    GetTermsByEducationLevelQuery,
    GetTermsByEducationLevelQueryVariables
  >(termsByEducationLevelDocument, { variables: { eid: parseInt(eid) } });

  const educationLevel = data?.getTerms[0].detail;
  const educationDetails = [
    educationLevel?.major.title,
    educationLevel?.major.level.title,
  ].join(' | ');

  const RenderContent = () => {
    if (loading)
      return (
        <Placeholder header="لطفا صبر کنید...">
          <Spinner color="primary" />
        </Placeholder>
      );
    else if (error || !data)
      return (
        <Text>
          {error?.message || 'Failed to fetch terms by education level'}
        </Text>
      );
    else
      return (
        <>
          <div>
            <Title className="text-center">
              {['اطلاعات ترم‌های', educationDetails].join(' ')}
            </Title>
          </div>
          <TermsByEducationLevelTable termsByEducationLevel={data.getTerms} />
        </>
      );
  };

  return (
    <section className="container mx-auto p-4">
      <BlurredCard classNames={{ body: 'space-y-2' }}>
        <div>
          <BackButton radius="full" />
        </div>
        <div className="space-y-4">
          <RenderContent />
          <div className="flex justify-center">
            <Button
              as={Link}
              href={`/my/education/${educationLevel?.id}/terms/new`}
              color="primary"
              variant="shadow"
              radius="full"
            >
              ثبت ترم جدید
            </Button>
          </div>
        </div>
      </BlurredCard>
    </section>
  );
};
