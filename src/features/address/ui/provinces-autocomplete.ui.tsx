'use client';

import type { ProvincesQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import { useProvinces, type UseProvincesProps } from '../lib/hooks';

export interface ProvincesAutocompleteProps
  extends UseProvincesProps,
    AutocompleteProps<ProvincesQueryReturn[number]> {}

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
