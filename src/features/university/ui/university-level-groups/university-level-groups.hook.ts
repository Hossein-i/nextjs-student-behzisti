import type { UniversityLevelGroupsQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { universityLevelGroups } from '../../actions';

export interface UseUniversityLevelGroupsProps {
  listOptions?: AsyncListOptions<
    UniversityLevelGroupsQueryReturn[number],
    string
  >;
}

export const useUniversityLevelGroups = (
  props: UseUniversityLevelGroupsProps = {}
) => {
  const { listOptions } = props;

  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const formData = new FormData();
      const response = await universityLevelGroups(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
    },
  });

  return { ...list };
};

export type UseUniversityLevelGroupsReturn = ReturnType<
  typeof useUniversityLevelGroups
>;
