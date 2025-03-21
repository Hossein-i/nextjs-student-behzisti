import type { ProvincesQueryReturn } from '@/shared/api/graphql';
import { type AsyncListOptions, useAsyncList } from '@react-stately/data';
import { provinces } from '../../actions';

export interface UseProvincesProps {
  listOptions?: AsyncListOptions<ProvincesQueryReturn[number], string>;
}

export const useProvinces = (props: UseProvincesProps = {}) => {
  const { listOptions } = props;

  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const formData = new FormData();
      const response = await provinces(undefined, formData);

      if (response.message || !response.data) {
        return { items: [] };
      }

      return { items: response.data };
    },
  });

  return { ...list };
};

export type UseProvincesReturn = ReturnType<typeof useProvinces>;
