import type { FieldValues } from 'react-hook-form';
import type { UseMultiFormReturn } from './lib/hooks';

export type MultiFormState<T extends FieldValues> =
  UseMultiFormReturn<T>['multiForm'] & {};
