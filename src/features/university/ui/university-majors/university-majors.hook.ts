import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityMajorsDocument,
  type UniversityMajorsQuery,
  type UniversityMajorsQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityMajorsProps {
  levelId: string;
  listOptions?: AsyncListOptions<
    UniversityMajorsQuery['getUniversityMajors'][number],
    string
  >;
}

export const useUniversityMajors = (
  props: UseUniversityMajorsProps = { levelId: '' }
) => {
  const { levelId, listOptions } = props;

  const isMounted = useIsMounted();

  const [universityMajorsQuery] = useLazyQuery<
    UniversityMajorsQuery,
    UniversityMajorsQueryVariables
  >(universityMajorsDocument);

  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await universityMajorsQuery({
        variables: { dto: { levelId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniversityMajors };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(levelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, levelId]);

  return { ...list };
};

export type UseUniversityMajorsReturn = ReturnType<typeof useUniversityMajors>;
