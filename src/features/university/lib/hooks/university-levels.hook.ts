import type { UniversityLevelsQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { universityLevels } from '../../actions';

export interface UseUniversityLevelsProps {
  subGroupId: string;
  listOptions?: AsyncListOptions<UniversityLevelsQueryReturn[number], string>;
}

export const useUniversityLevels = (
  props: UseUniversityLevelsProps = { subGroupId: '' }
) => {
  const { subGroupId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('subGroupId', filterText);
      const response = await universityLevels(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
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
