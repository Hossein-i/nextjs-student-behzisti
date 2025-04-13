import type { UniversityDepartmentsQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { universityDepartments } from '../../actions';

export interface UseUniversityDepartmentsProps {
  countyId: string;
  typeId: string;
  listOptions?: AsyncListOptions<
    UniversityDepartmentsQueryReturn[number],
    string
  >;
}

export const useUniversityDepartments = (
  props: UseUniversityDepartmentsProps = { countyId: '', typeId: '' }
) => {
  const { countyId, typeId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const [cid, tid] = JSON.parse(filterText);

      if (!cid || cid === '' || !tid || tid === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('countyId', cid);
      formData.set('typeId', tid);
      const response = await universityDepartments(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(JSON.stringify([countyId, typeId]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, countyId, typeId]);

  return { ...list };
};

export type UseUniversityDepartmentsReturn = ReturnType<
  typeof useUniversityDepartments
>;
