'use client';

import type { UniversityTypesQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import { useUniversityTypes, type UseUniversityTypesProps } from '../lib/hooks';

export interface UniversityTypesAutocompleteProps
  extends UseUniversityTypesProps,
    AutocompleteProps<UniversityTypesQueryReturn[number]> {}

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
