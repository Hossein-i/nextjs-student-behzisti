import { useLazyQuery } from '@apollo/client/react';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  subDistrictsByDistrictDocument,
  type SubDistrictsByDistrictQuery,
  type SubDistrictsByDistrictQueryVariables,
} from '@/shared/api/graphql';

export interface UseSubDistrictsProps {
  deviationId: string;
  listOptions?: AsyncListOptions<
    SubDistrictsByDistrictQuery['getSubDeviations'][number],
    string
  >;
}

export const useSubDistricts = (props: UseSubDistrictsProps) => {
  const { deviationId, listOptions } = props;

  const isMounted = useIsMounted();

  const [subDistrictsByDistrictQuery] = useLazyQuery<
    SubDistrictsByDistrictQuery,
    SubDistrictsByDistrictQueryVariables
  >(subDistrictsByDistrictDocument);
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: deviationId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await subDistrictsByDistrictQuery({
        variables: { dto: { deviationId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getSubDeviations };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(deviationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, deviationId]);

  return { ...list };
};

export type UseSubDistrictsReturn = ReturnType<typeof useSubDistricts>;
