'use client';

import type { DistrictsByCountyQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import { useDistricts, type UseDistrictsProps } from '../lib/hooks';

export interface DistrictsAutocompleteProps
  extends UseDistrictsProps,
    AutocompleteProps<DistrictsByCountyQueryReturn[number]> {}

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
