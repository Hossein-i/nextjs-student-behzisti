import type { UniversityLevelSubGroupsQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { universityLevelSubGroups } from '../../actions';

export interface UseUniversityLevelSubGroupsProps {
  groupId: string;
  listOptions?: AsyncListOptions<
    UniversityLevelSubGroupsQueryReturn[number],
    string
  >;
}

export const useUniversityLevelSubGroups = (
  props: UseUniversityLevelSubGroupsProps = { groupId: '' }
) => {
  const { groupId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('groupId', filterText);
      const response = await universityLevelSubGroups(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
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
