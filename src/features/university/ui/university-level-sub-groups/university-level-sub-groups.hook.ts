import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  universityLevelSubGroupsDocument,
  UniversityLevelSubGroupsQuery,
  UniversityLevelSubGroupsQueryVariables,
} from '@/shared/api/graphql';

export interface UseUniversityLevelSubGroupsProps {
  groupId: string;
  listOptions?: AsyncListOptions<
    UniversityLevelSubGroupsQuery['getUniveristyLevelSubGroups'][number],
    string
  >;
}

export const useUniversityLevelSubGroups = (
  props: UseUniversityLevelSubGroupsProps = { groupId: '' }
) => {
  const { groupId, listOptions } = props;

  const isMounted = useIsMounted();

  const [universityLevelSubGroupsQuery] = useLazyQuery<
    UniversityLevelSubGroupsQuery,
    UniversityLevelSubGroupsQueryVariables
  >(universityLevelSubGroupsDocument);
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const { error, data } = await universityLevelSubGroupsQuery({
        variables: { dto: { groupId: parseInt(filterText) } },
      });

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getUniveristyLevelSubGroups };
    },
  });

  useEffect(() => {
    if (isMounted()) {
      list.setFilterText(groupId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, groupId]);

  return { ...list };
};

export type UseUniversityLevelSubGroupsReturn = ReturnType<
  typeof useUniversityLevelSubGroups
>;
