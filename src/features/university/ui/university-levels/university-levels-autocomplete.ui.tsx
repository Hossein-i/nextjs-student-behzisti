'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityLevels,
  type UseUniversityLevelsProps,
} from './university-levels.hook';

import type { UniversityLevelsQuery } from '@/shared/api/graphql';

export interface UniversityLevelsAutocompleteProps
  extends UseUniversityLevelsProps,
    AutocompleteProps<UniversityLevelsQuery['getUniversityLevels'][number]> {}

export const UniversityLevelsAutocomplete: React.FC<
  UniversityLevelsAutocompleteProps
> = (props) => {
  const { subGroupId, listOptions, ...restProps } = props;

  const list = useUniversityLevels({ subGroupId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
