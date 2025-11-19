'use client';

import { useQuery } from '@apollo/client/react';
import { Spinner } from '@heroui/react';
import { notFound, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { TermsByEducationLevelForm } from '@/features/education/ui';
import {
  GetTermsByEducationLevelQuery,
  GetTermsByEducationLevelQueryVariables,
  termsByEducationLevelDocument,
} from '@/shared/api/graphql';
import { BackButton } from '@/shared/ui/back-button';
import { BlurredCard } from '@/shared/ui/blurred-card';
import { Placeholder } from '@/shared/ui/placeholder';
import { Text } from '@/shared/ui/typography';

const urlsToFiles = async (urls: string[]) => {
  const files: File[] = [];

  for (const url of urls) {
    const res = await fetch(url);
    const blob = await res.blob();

    const fileName = url.split('/').pop() || 'image.jpg';
    const file = new File([blob], fileName, { type: blob.type });

    files.push(file);
  }

  return files;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditTermByEducationLevelPageProps {}

export const EditTermByEducationLevelPage: React.FC<
  EditTermByEducationLevelPageProps
> = () => {
  const params = useParams();
  const eid = params?.eid.toString() || '';
  const tid = params?.tid.toString() || '';

  const { loading, error, data } = useQuery<
    GetTermsByEducationLevelQuery,
    GetTermsByEducationLevelQueryVariables
  >(termsByEducationLevelDocument, { variables: { eid: parseInt(eid) } });

  const [files, setFiles] = useState<Array<File>>([]);

  const renderContent = () => {
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
      const term = data.getTerms.find((t) => tid === t.id);

      if (!term) {
        return notFound();
      }
      const { id, year, semister, unit, cost, account } = term;
      const defaultValues = {
        detail: eid,
        imagesNumber: [1, 2, 3],
        images: files,
        id,
        year: year.id,
        semister: semister.toString(),
        unit,
        cost,
        account: account || undefined,
      };
      return (
        <TermsByEducationLevelForm defaultValues={defaultValues} isEditMode />
      );
    }
  };

  useEffect(() => {
    urlsToFiles([
      `/api/images/${tid}/0`,
      `/api/images/${tid}/1`,
      `/api/images/${tid}/2`,
    ]).then((value) => setFiles(value));
  }, [tid]);

  return (
    <section className="container mx-auto p-4">
      <BlurredCard classNames={{ body: 'space-y-2' }}>
        <div>
          <BackButton radius="full" />
        </div>
        <Placeholder header="فرم ویرایش ترم" description=""></Placeholder>
        {renderContent()}
      </BlurredCard>
    </section>
  );
};
