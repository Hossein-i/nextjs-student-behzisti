import React, { createContext } from 'react';
import type { FieldValues } from 'react-hook-form';
import { MultiFormState } from '../types';

const defaultValue = {
  currentStep: 0,
  totalSteps: 1,
  visitedSteps: new Set(),
  isFirstStep: true,
  isLastStep: false,
  stepComponent: React.createElement('div'),
  validateCurrentStep: async () => false,
  nextStep: async () => {},
  prevStep: () => {},
  goToStep: () => {},
} as const satisfies MultiFormState<FieldValues>;

export const MultiFormContext =
  createContext<MultiFormState<FieldValues>>(defaultValue);
