'use client';

import React, { useEffect } from 'react';

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  stepLabel?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const Step: React.FC<StepProps> = (props) => {
  const { children, stepLabel, onEnter, onLeave, ...restProps } = props;

  useEffect(() => {
    onEnter?.();
    return () => onLeave?.();
  }, [onEnter, onLeave]);

  return (
    <div {...restProps} aria-label={stepLabel}>
      {children}
    </div>
  );
};
