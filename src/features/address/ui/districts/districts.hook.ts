import { useLazyQuery } from '@apollo/client/react';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  districtsByCountyDocument,
  type DistrictsByCountyQuery,
  type DistrictsByCountyQueryVariables,
} from '@/shared/api/graphql';

export interface UseDistrictsProps {
  countyId: string;
  listOptions?: AsyncListOptions<
    DistrictsByCountyQuery['getDeviatins'][number],
    string
  >;
}

export const useDistricts = (props: UseDistrictsProps) => {
  const { countyId, listOptions } = props;

  const isMounted = useIsMounted();

  const [districtsByCountyQuery] = useLazyQuery<
    DistrictsByCountyQuery,
    DistrictsByCountyQueryVariables
  >(districtsByCountyDocument);
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: countyId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await districtsByCountyQuery({
        variables: { dto: { countyId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getDeviatins };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(countyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, countyId]);

  return { ...list };
};

export type UseDistrictsReturn = ReturnType<typeof useDistricts>;
