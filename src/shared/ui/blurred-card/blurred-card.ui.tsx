'use client';

import { Card, CardBody, type CardProps, cn } from '@heroui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BlurredCardProps extends CardProps {}

export const BlurredCard: React.FC<BlurredCardProps> = (props) => {
  const { children, className, isBlurred = true, ...restProps } = props;

  return (
    <Card
      className={cn(
        'flex-row border border-background/50 bg-background/75',
        className
      )}
      isBlurred={isBlurred}
      {...restProps}
    >
      <CardBody className="text-start">{children}</CardBody>
    </Card>
  );
};
