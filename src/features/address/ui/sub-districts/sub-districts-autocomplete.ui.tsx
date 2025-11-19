'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';

import {
  useSubDistricts,
  type UseSubDistrictsProps,
} from './sub-districts.hook';

import type { SubDistrictsByDistrictQuery } from '@/shared/api/graphql';

export interface SubDistrictsAutocompleteProps
  extends UseSubDistrictsProps,
    AutocompleteProps<
      SubDistrictsByDistrictQuery['getSubDeviations'][number]
    > {}

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
