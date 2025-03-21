import type { DistrictsByCountyQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { districtsByCounty } from '../../actions';

export interface UseDistrictsProps {
  countyId: string;
  listOptions?: AsyncListOptions<DistrictsByCountyQueryReturn[number], string>;
}

export const useDistricts = (props: UseDistrictsProps) => {
  const { countyId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: countyId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('countyId', filterText);
      const response = await districtsByCounty(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
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
