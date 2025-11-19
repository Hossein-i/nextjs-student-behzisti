'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityDepartments,
  type UseUniversityDepartmentsProps,
} from './university-departments.hook';

import type { UniversityDepartmentsQuery } from '@/shared/api/graphql';

export interface UniversityDepartmentsAutocompleteProps
  extends UseUniversityDepartmentsProps,
    AutocompleteProps<
      UniversityDepartmentsQuery['getUniversityDepartments'][number]
    > {}

export const UniversityDepartmentsAutocomplete: React.FC<
  UniversityDepartmentsAutocompleteProps
> = (props) => {
  const { countyId, typeId, listOptions, ...restProps } = props;

  const list = useUniversityDepartments({ countyId, typeId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
