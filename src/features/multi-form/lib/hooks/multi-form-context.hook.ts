import { useContext } from 'react';
import { useFormContext, type FieldValues } from 'react-hook-form';

import { MultiFormContext } from '../../contexts';
import type { MultiFormState } from '../../types';

export const useMultiFormContext = <T extends FieldValues>() => {
  const formContext = useFormContext<T>();
  const multiFormContext = useContext<MultiFormState<T>>(MultiFormContext);

  return { form: formContext, multiForm: multiFormContext };
};

export type UseMultiFormContextReturn = ReturnType<typeof useMultiFormContext>;
