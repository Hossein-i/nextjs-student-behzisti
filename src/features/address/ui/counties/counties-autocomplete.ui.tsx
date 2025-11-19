'use client';

import { Autocomplete, type AutocompleteProps } from '@heroui/react';

import { useCounties, type UseCountiesProps } from './counties.hook';

import type { CountiesByProvinceQuery } from '@/shared/api/graphql';

export interface CountiesAutocompleteProps
  extends UseCountiesProps,
    AutocompleteProps<CountiesByProvinceQuery['getCounties'][number]> {}

export const CountiesAutocomplete = (props: CountiesAutocompleteProps) => {
  const { provinceId, listOptions, ...restProps } = props;

  const list = useCounties({ provinceId, listOptions });

  return (
    <Autocomplete
      {...restProps}
      items={list.items}
      isLoading={list.isLoading}
    />
  );
};
