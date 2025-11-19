import { useLazyQuery } from '@apollo/client/react';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityLevelsDocument,
  type UniversityLevelsQuery,
  type UniversityLevelsQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityLevelsProps {
  subGroupId: string;
  listOptions?: AsyncListOptions<
    UniversityLevelsQuery['getUniversityLevels'][number],
    string
  >;
}

export const useUniversityLevels = (
  props: UseUniversityLevelsProps = { subGroupId: '' }
) => {
  const { subGroupId, listOptions } = props;

  const isMounted = useIsMounted();

  const [universityLevelsQuery] = useLazyQuery<
    UniversityLevelsQuery,
    UniversityLevelsQueryVariables
  >(universityLevelsDocument);
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await universityLevelsQuery({
        variables: { dto: { subGroupId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniversityLevels };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(subGroupId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, subGroupId]);

  return { ...list };
};

export type UseUniversityLevelsReturn = ReturnType<typeof useUniversityLevels>;
