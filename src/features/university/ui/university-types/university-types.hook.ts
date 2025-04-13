import type { UniversityTypesQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { universityTypes } from '../../actions';

export interface UseUniversityTypesProps {
  listOptions?: AsyncListOptions<UniversityTypesQueryReturn[number], string>;
}

export const useUniversityTypes = (props: UseUniversityTypesProps = {}) => {
  const { listOptions } = props;

  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const formData = new FormData();
      const response = await universityTypes(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
    },
  });

  return { ...list };
};

export type UseUniversityTypesReturn = ReturnType<typeof useUniversityTypes>;
