'use client';

import { Form } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

import { MultiFormContext } from '../contexts';
import { useMultiForm, type UseMultiFormProps } from '../lib/hooks';

import { StepNavigation, type StepNavigationProps } from './step-navigation.ui';
import { Step } from './step.ui';
import { Steps, type StepsProps } from './steps.ui';

const animationVariants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export interface MultiFormProps<T extends FieldValues>
  extends Omit<UseMultiFormProps<T>, 'children'> {
  children: [
    React.ReactElement<StepsProps>,
    React.ReactElement<StepNavigationProps>,
  ];
  onSubmit?: SubmitHandler<T>;
}

export const MultiForm = <T extends FieldValues>(props: MultiFormProps<T>) => {
  const { onSubmit, children, ...restProps } = props;

  const steps = children.find(
    (child) => React.isValidElement(child) && child.type === Steps
  ) as React.ReactElement<StepsProps>;

  const stepNavigation = children.find(
    (child) => child.type === StepNavigation
  ) as React.ReactElement<StepNavigationProps>;

  const { form, multiForm } = useMultiForm<T>({
    ...restProps,
    children: steps?.props.children,
  });
  const { handleSubmit } = form;
  const { currentStep, stepComponent } = multiForm;

  return (
    <FormProvider {...form}>
      <MultiFormContext.Provider value={multiForm}>
        <Form
          className="flex w-full flex-col gap-4"
          onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
          autoComplete="off"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={animationVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {stepComponent}
            </motion.div>
          </AnimatePresence>

          <div className="w-full">{stepNavigation}</div>
        </Form>
      </MultiFormContext.Provider>
    </FormProvider>
  );
};

MultiForm.Steps = Steps;
MultiForm.Step = Step;
MultiForm.StepNavigation = StepNavigation;
