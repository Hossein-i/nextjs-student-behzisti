import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityTypesDocument,
  UniversityTypesQuery,
  UniversityTypesQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityTypesProps {
  listOptions?: AsyncListOptions<
    UniversityTypesQuery['getUniversityTypes'][number],
    string
  >;
}

export const useUniversityTypes = (props: UseUniversityTypesProps = {}) => {
  const { listOptions } = props;

  const isMounted = useIsMounted();

  const [universityTypesQuery] = useLazyQuery<
    UniversityTypesQuery,
    UniversityTypesQueryVariables
  >(universityTypesDocument);
  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const { error, data } = await universityTypesQuery();

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniversityTypes };
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

export type UseUniversityTypesReturn = ReturnType<typeof useUniversityTypes>;
