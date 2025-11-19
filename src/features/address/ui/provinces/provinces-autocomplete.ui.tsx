'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';

import { useProvinces, type UseProvincesProps } from './provinces.hook';

import type { ProvincesQuery } from '@/shared/api/graphql';

export interface ProvincesAutocompleteProps
  extends UseProvincesProps,
    AutocompleteProps<ProvincesQuery['getProvinces'][number]> {}

export const ProvincesAutocomplete = (props: ProvincesAutocompleteProps) => {
  const { listOptions, ...restProps } = props;

  const list = useProvinces({ listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
