'use client';

import type { UniversityDepartmentsQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import {
  useUniversityDepartments,
  type UseUniversityDepartmentsProps,
} from '../lib/hooks/university-departments.hook';

export interface UniversityDepartmentsAutocompleteProps
  extends UseUniversityDepartmentsProps,
    AutocompleteProps<UniversityDepartmentsQueryReturn[number]> {}

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
