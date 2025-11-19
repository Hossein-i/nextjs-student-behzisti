'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';

import { useDistricts, type UseDistrictsProps } from './districts.hook';

import type { DistrictsByCountyQuery } from '@/shared/api/graphql';

export interface DistrictsAutocompleteProps
  extends UseDistrictsProps,
    AutocompleteProps<DistrictsByCountyQuery['getDeviatins'][number]> {}

export const DistrictsAutocomplete = (props: DistrictsAutocompleteProps) => {
  const { countyId, listOptions, ...restProps } = props;

  const list = useDistricts({ countyId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
