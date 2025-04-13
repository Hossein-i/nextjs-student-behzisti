import type { UniversityMajorsQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { useEffect } from 'react';
import { useIsMounted } from 'usehooks-ts';
import { universityMajors } from '../../actions';

export interface UseUniversityMajorsProps {
  levelId: string;
  listOptions?: AsyncListOptions<UniversityMajorsQueryReturn[number], string>;
}

export const useUniversityMajors = (
  props: UseUniversityMajorsProps = { levelId: '' }
) => {
  const { levelId, listOptions } = props;

  const isMounted = useIsMounted();
  const list = useAsyncList({
    ...listOptions,
    load: async ({ filterText }) => {
      if (!filterText || filterText === '') {
        return { items: [] };
      }

      const formData = new FormData();
      formData.set('levelId', filterText);
      const response = await universityMajors(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
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
