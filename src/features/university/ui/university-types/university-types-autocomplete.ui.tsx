'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityTypes,
  type UseUniversityTypesProps,
} from './university-types.hook';

import type { UniversityTypesQuery } from '@/shared/api/graphql';

export interface UniversityTypesAutocompleteProps
  extends UseUniversityTypesProps,
    AutocompleteProps<UniversityTypesQuery['getUniversityTypes'][number]> {}

export const UniversityTypesAutocomplete: React.FC<
  UniversityTypesAutocompleteProps
> = (props) => {
  const { listOptions, ...restProps } = props;

  const list = useUniversityTypes({ listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
