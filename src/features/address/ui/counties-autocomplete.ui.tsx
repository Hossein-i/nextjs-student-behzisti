'use client';

import type { CountiesByProvinceQueryReturn } from '@/shared/api/graphql';
import { Autocomplete, type AutocompleteProps } from '@heroui/react';
import { useCounties, type UseCountiesProps } from '../lib/hooks';

export interface CountiesAutocompleteProps
  extends UseCountiesProps,
    AutocompleteProps<CountiesByProvinceQueryReturn[number]> {}

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
