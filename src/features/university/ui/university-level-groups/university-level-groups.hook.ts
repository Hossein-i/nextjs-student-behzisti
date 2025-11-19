import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityLevelGroupsDocument,
  UniversityLevelGroupsQuery,
  UniversityLevelGroupsQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityLevelGroupsProps {
  listOptions?: AsyncListOptions<
    UniversityLevelGroupsQuery['getUniveristyLevelGroups'][number],
    string
  >;
}

export const useUniversityLevelGroups = (
  props: UseUniversityLevelGroupsProps = {}
) => {
  const { listOptions } = props;

  const isMounted = useIsMounted();

  const [universityLevelGroupsQuery] = useLazyQuery<
    UniversityLevelGroupsQuery,
    UniversityLevelGroupsQueryVariables
  >(universityLevelGroupsDocument);

  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const { error, data } = await universityLevelGroupsQuery();

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniveristyLevelGroups };
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

export type UseUniversityLevelGroupsReturn = ReturnType<
  typeof useUniversityLevelGroups
>;
