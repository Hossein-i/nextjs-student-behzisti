import type { SubDistrictsByDistrictQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { subDistrictsByDistrict } from '../../actions';

export interface UseSubDistrictsProps {
  deviationId: string;
  listOptions?: AsyncListOptions<
    SubDistrictsByDistrictQueryReturn[number],
    string
  >;
}

export const useSubDistricts = (props: UseSubDistrictsProps) => {
  const { deviationId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    initialFilterText: deviationId,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('deviationId', filterText);
      const response = await subDistrictsByDistrict(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
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
