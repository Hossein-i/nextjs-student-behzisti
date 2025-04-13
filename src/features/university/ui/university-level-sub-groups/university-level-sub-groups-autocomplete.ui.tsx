'use client';

import type { UniversityLevelSubGroupsQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import React from 'react';
import {
  useUniversityLevelSubGroups,
  type UseUniversityLevelSubGroupsProps,
} from './university-level-sub-groups.hook';

export interface UniversityLevelSubGroupsAutocompleteProps
  extends UseUniversityLevelSubGroupsProps,
    AutocompleteProps<UniversityLevelSubGroupsQueryReturn[number]> {}

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
