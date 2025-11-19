import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  provincesDocument,
  ProvincesQuery,
  ProvincesQueryVariables,
} from '@/shared/api/graphql';

export interface UseProvincesProps {
  listOptions?: AsyncListOptions<
    ProvincesQuery['getProvinces'][number],
    string
  >;
}

export const useProvinces = (props: UseProvincesProps = {}) => {
  const { listOptions } = props;

  const isMounted = useIsMounted();

  const [provincesQuery] = useLazyQuery<
    ProvincesQuery,
    ProvincesQueryVariables
  >(provincesDocument);
  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const { error, data } = await provincesQuery();

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getProvinces };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return { ...list };
};

export type UseProvincesReturn = ReturnType<typeof useProvinces>;
