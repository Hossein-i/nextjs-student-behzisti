import { educationLevelsQuery } from '@/shared/api/graphql';
import { handleAuthError } from '@/shared/lib/handleAuthError';
import { EducationLevels } from '@/views/education/ui';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic'; // Force dynamic rendering
export const revalidate = 0; // Disable static generation

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EducationLevelsPageProps {}

const EducationLevelsPage: React.FC<EducationLevelsPageProps> = async () => {
  const educationLevels = await handleAuthError(educationLevelsQuery, () => {
    redirect('/api/auth/sign-out');
  })();

  if (!educationLevels) {
    throw new Error('Failed to fetch education levels');
  }

  return <EducationLevels educationLevels={educationLevels} />;
};

export default EducationLevelsPage;
