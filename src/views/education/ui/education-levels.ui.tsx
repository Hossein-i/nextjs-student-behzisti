import { EducationLevel } from '@/features/education/types';
import { EducationLevelsTable } from '@/features/education/ui';
import { BlurredCard } from '@/shared/ui/blurred-card';
import React from 'react';

export interface EducationLevelsProps {
  educationLevels: EducationLevel[];
}

export const EducationLevels: React.FC<EducationLevelsProps> = (props) => {
  const { educationLevels } = props;

  return (
    <section className="container mx-auto p-4">
      <BlurredCard>
        <EducationLevelsTable educationLevels={educationLevels} />
      </BlurredCard>
    </section>
  );
};
