import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityDepartmentsDocument,
  UniversityDepartmentsQuery,
  UniversityDepartmentsQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityDepartmentsProps {
  countyId: string;
  typeId: string;
  listOptions?: AsyncListOptions<
    UniversityDepartmentsQuery['getUniversityDepartments'][number],
    string
  >;
}

export const useUniversityDepartments = (
  props: UseUniversityDepartmentsProps = { countyId: '', typeId: '' }
) => {
  const { countyId, typeId, listOptions } = props;

  const isMounted = useIsMounted();

  const [universityDepartmentsQuery] = useLazyQuery<
    UniversityDepartmentsQuery,
    UniversityDepartmentsQueryVariables
  >(universityDepartmentsDocument);

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

      const { error, data } = await universityDepartmentsQuery({
        variables: { dto: { countyId: parseInt(cid), typeId: parseInt(tid) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniversityDepartments };
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
