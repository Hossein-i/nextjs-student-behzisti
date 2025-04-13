'use client';

import type { UniversityMajorsQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import {
  useUniversityMajors,
  type UseUniversityMajorsProps,
} from './university-majors.hook';

export interface UniversityMajorsAutocompleteProps
  extends UseUniversityMajorsProps,
    AutocompleteProps<UniversityMajorsQueryReturn[number]> {}

export const UniversityMajorsAutocomplete: React.FC<
  UniversityMajorsAutocompleteProps
> = (props) => {
  const { levelId, listOptions, ...restProps } = props;

  const list = useUniversityMajors({ levelId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
