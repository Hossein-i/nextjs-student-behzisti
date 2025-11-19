'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityMajors,
  type UseUniversityMajorsProps,
} from './university-majors.hook';

import type { UniversityMajorsQuery } from '@/shared/api/graphql';

export interface UniversityMajorsAutocompleteProps
  extends UseUniversityMajorsProps,
    AutocompleteProps<UniversityMajorsQuery['getUniversityMajors'][number]> {}

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
