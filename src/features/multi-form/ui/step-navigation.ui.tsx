'use client';

import { Button, cn } from '@heroui/react';
import React from 'react';
import { useMultiFormContext, UseMultiFormContextReturn } from '../lib/hooks';

export interface StepNavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  // eslint-disable-next-line no-unused-vars
  children?: (context: UseMultiFormContextReturn) => React.ReactNode;
}

const defaultChildren: StepNavigationProps['children'] = (context) => {
  const { form, multiForm } = context;
  const { formState } = form;
  const { isSubmitting } = formState;
  const { isFirstStep, isLastStep, prevStep, nextStep } = multiForm;

  return (
    <>
      {!isFirstStep && (
        <Button
          key="prev-step"
          variant="bordered"
          color="primary"
          radius="full"
          onPress={prevStep}
          isDisabled={isSubmitting}
        >
          قبلی
        </Button>
      )}
      {isLastStep ? (
        <Button
          key="submit-form"
          type="submit"
          variant="shadow"
          color="primary"
          radius="full"
          isLoading={isSubmitting}
        >
          ثبت
        </Button>
      ) : (
        <Button
          key="next-step"
          variant="shadow"
          color="primary"
          radius="full"
          onPress={nextStep}
        >
          بعدی
        </Button>
      )}
    </>
  );
};

export const StepNavigation: React.FC<StepNavigationProps> = (props) => {
  const { children = defaultChildren, className, ...restProps } = props;

  const { form, multiForm } = useMultiFormContext();

  return (
    <div {...restProps} className={cn('flex justify-end gap-2', className)}>
      {children({ form, multiForm })}
    </div>
  );
};
