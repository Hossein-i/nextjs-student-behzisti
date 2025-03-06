import { termsByEducationLevelQuery } from '@/shared/api/graphql';
import { handleAuthError } from '@/shared/lib/handleAuthError';
import { TermsByEducationLevel } from '@/views/education/ui';
import { redirect } from 'next/navigation';
import React from 'react';

interface TermsByEducationLevelPageProps {
  params: Promise<{ eid: string }>;
}

const TermsByEducationLevelPage: React.FC<
  TermsByEducationLevelPageProps
> = async (props) => {
  const { params } = props;
  const { eid } = await params;
  const termsByEducationLevel = await handleAuthError(
    () => {
      return termsByEducationLevelQuery({ eid: Number(eid) });
    },
    () => {
      redirect('/api/auth/sign-out');
    }
  )();

  if (!termsByEducationLevel) {
    throw new Error('Failed to fetch terms by education level');
  }

  return (
    <TermsByEducationLevel termsByEducationLevel={termsByEducationLevel} />
  );
};

export default TermsByEducationLevelPage;
