'use client';

import React from 'react';

import { StepProps } from './step.ui';

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<StepProps> | React.ReactElement<StepProps>[];
  stepsLabel?: string;
}

export const Steps: React.FC<StepsProps> = (props) => {
  const { children, stepsLabel, ...restProps } = props;

  return (
    <div {...restProps} aria-label={stepsLabel}>
      {children}
    </div>
  );
};
