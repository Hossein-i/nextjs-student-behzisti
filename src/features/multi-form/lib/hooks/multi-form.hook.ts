import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import {
  type DefaultValues,
  type FieldValues,
  type Mode,
  type Path,
  useForm,
} from 'react-hook-form';
import { type ZodSchema } from 'zod';

import { Step, type StepProps } from '../../ui';

export interface UseMultiFormProps<T extends FieldValues> {
  children?: React.ReactElement<StepProps> | React.ReactElement<StepProps>[];
  defaultStep?: number;
  defaultValues?: DefaultValues<T>;
  stepFields?: (Path<T> | Path<T>[] | readonly Path<T>[])[];
  validationSchema?: ZodSchema<T>;
  mode?: Mode;
}

export const useMultiForm = <T extends FieldValues>(
  props: UseMultiFormProps<T> = {}
) => {
  const {
    children,
    defaultStep = 0,
    defaultValues,
    stepFields,
    validationSchema,
    mode = 'onTouched',
  } = props;

  const form = useForm<T>({
    defaultValues,
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    mode,
  });

  const steps = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Step)
    .map((child) => child as React.ReactElement<StepProps>);

  const [currentStep, setCurrentStep] = useState(defaultStep);
  const [visitedSteps, setVisitedSteps] = useState(new Set([defaultStep]));

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const totalSteps = steps.length;

  const stepComponent = steps[currentStep];

  const validateCurrentStep = async () => {
    return await form.trigger(
      stepFields ? stepFields[currentStep] : undefined,
      { shouldFocus: true }
    );
  };

  const nextStep = async () => {
    try {
      const isValid = await validateCurrentStep();

      if (!isValid) {
        return;
      }

      setCurrentStep((prev) => {
        const nextStep = Math.min(prev + 1, steps.length - 1);
        setVisitedSteps((prev) => new Set([...prev, nextStep]));
        return nextStep;
      });
    } catch (error) {
      console.error('[useMultiForm]: ', error);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)));
  };

  return {
    form,
    multiForm: {
      currentStep,
      visitedSteps,
      stepComponent,
      isFirstStep,
      isLastStep,
      totalSteps,
      validateCurrentStep,
      nextStep,
      prevStep,
      goToStep,
    },
  };
};

export type UseMultiFormReturn<T extends FieldValues> = ReturnType<
  typeof useMultiForm<T>
>;
