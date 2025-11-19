'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';

import {
  useUniversityLevelSubGroups,
  type UseUniversityLevelSubGroupsProps,
} from './university-level-sub-groups.hook';

import type { UniversityLevelSubGroupsQuery } from '@/shared/api/graphql';

export interface UniversityLevelSubGroupsAutocompleteProps
  extends UseUniversityLevelSubGroupsProps,
    AutocompleteProps<
      UniversityLevelSubGroupsQuery['getUniveristyLevelSubGroups'][number]
    > {}

export const UniversityLevelSubGroupsAutocomplete: React.FC<
  UniversityLevelSubGroupsAutocompleteProps
> = (props) => {
  const { groupId, listOptions, ...restProps } = props;

  const list = useUniversityLevelSubGroups({ groupId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
