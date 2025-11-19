'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityLevelGroups,
  type UseUniversityLevelGroupsProps,
} from './university-level-groups.hook';

import type { UniversityLevelGroupsQuery } from '@/shared/api/graphql';

export interface UniversityLevelGroupsAutocompleteProps
  extends UseUniversityLevelGroupsProps,
    AutocompleteProps<
      UniversityLevelGroupsQuery['getUniveristyLevelGroups'][number]
    > {}

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
