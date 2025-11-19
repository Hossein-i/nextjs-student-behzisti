import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  countiesByProvinceDocument,
  CountiesByProvinceQuery,
  CountiesByProvinceQueryVariables,
} from '@/shared/api/graphql';

export interface UseCountiesProps {
  provinceId: string;
  listOptions?: AsyncListOptions<
    CountiesByProvinceQuery['getCounties'][number],
    string
  >;
}

export const useCounties = (props: UseCountiesProps) => {
  const { provinceId, listOptions } = props;

  const isMounted = useIsMounted();

  const [countiesByProvinceQuery] = useLazyQuery<
    CountiesByProvinceQuery,
    CountiesByProvinceQueryVariables
  >(countiesByProvinceDocument);
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: provinceId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await countiesByProvinceQuery({
        variables: { dto: { provinceId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getCounties };
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
