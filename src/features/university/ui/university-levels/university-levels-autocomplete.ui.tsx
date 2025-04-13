'use client';

import type { UniversityLevelsQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import {
  useUniversityLevels,
  type UseUniversityLevelsProps,
} from './university-levels.hook';

export interface UniversityLevelsAutocompleteProps
  extends UseUniversityLevelsProps,
    AutocompleteProps<UniversityLevelsQueryReturn[number]> {}

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
