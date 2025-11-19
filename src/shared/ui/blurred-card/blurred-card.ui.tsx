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
        'border-background/50 dark:bg-background/80 flex-row border',
        className
      )}
      isBlurred={isBlurred}
      {...restProps}
    >
      <CardBody className="text-start">{children}</CardBody>
    </Card>
  );
};
