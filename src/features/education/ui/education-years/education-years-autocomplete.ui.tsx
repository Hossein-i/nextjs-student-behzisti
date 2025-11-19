'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useEducationYears,
  type UseEducationYearsProps,
} from './education-years.hook';

import type { GetEducationYearsQuery } from '@/shared/api/graphql';

export interface EducationYearsAutocompleteProps
  extends UseEducationYearsProps,
    AutocompleteProps<GetEducationYearsQuery['getYears'][number]> {}

export const EducationYearsAutocomplete: React.FC<
  EducationYearsAutocompleteProps
> = (props) => {
  const { listOptions, onSemesterChange, ...restProps } = props;

  const list = useEducationYears({
    listOptions,
    selectedEducationYear: props.selectedKey?.toString(),
    onSemesterChange,
  });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
