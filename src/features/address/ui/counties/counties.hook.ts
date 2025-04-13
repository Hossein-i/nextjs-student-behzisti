import type { CountiesByProvinceQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { countiesByProvince } from '../../actions';

export interface UseCountiesProps {
  provinceId: string;
  listOptions?: AsyncListOptions<CountiesByProvinceQueryReturn[number], string>;
}

export const useCounties = (props: UseCountiesProps) => {
  const { provinceId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: provinceId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('provinceId', filterText);
      const response = await countiesByProvince(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(provinceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, provinceId]);

  return { ...list };
};

export type UseCountiesReturn = ReturnType<typeof useCounties>;
