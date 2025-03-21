'use client';

import type { UniversityLevelGroupsQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import {
  useUniversityLevelGroups,
  type UseUniversityLevelGroupsProps,
} from '../lib/hooks';

export interface UniversityLevelGroupsAutocompleteProps
  extends UseUniversityLevelGroupsProps,
    AutocompleteProps<UniversityLevelGroupsQueryReturn[number]> {}

export const UniversityLevelGroupsAutocomplete: React.FC<
  UniversityLevelGroupsAutocompleteProps
> = (props) => {
  const { listOptions, ...restProps } = props;

  const list = useUniversityLevelGroups({ listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
