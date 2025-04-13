'use client';

import type { SubDistrictsByDistrictQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import {
  useSubDistricts,
  type UseSubDistrictsProps,
} from './sub-districts.hook';

export interface SubDistrictsAutocompleteProps
  extends UseSubDistrictsProps,
    AutocompleteProps<SubDistrictsByDistrictQueryReturn[number]> {}

export const SubDistrictsAutocomplete = (
  props: SubDistrictsAutocompleteProps
) => {
  const { deviationId, listOptions, ...restProps } = props;

  const list = useSubDistricts({ deviationId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
