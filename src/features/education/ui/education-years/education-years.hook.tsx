import { useLazyQuery } from '@apollo/client/react';
import { useAsyncList, type AsyncListOptions } from '@react-stately/data';
import { useEffect, useMemo } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  educationYearsDocument,
  GetEducationYearsQuery,
  GetEducationYearsQueryVariables,
} from '@/shared/api/graphql';

export interface UseEducationYearsProps {
  listOptions?: AsyncListOptions<
    GetEducationYearsQuery['getYears'][number],
    string
  >;
  selectedEducationYear?: string;
  onSemesterChange?: (
    value: Array<{
      id: number;
      title: string;
      isEnabled?: boolean | null;
    }>
  ) => void;
}

export const useEducationYears = (props: UseEducationYearsProps) => {
  const { listOptions, selectedEducationYear, onSemesterChange } = props;

  const isMounted = useIsMounted();

  const [getEducationYearsQuery] = useLazyQuery<
    GetEducationYearsQuery,
    GetEducationYearsQueryVariables
  >(educationYearsDocument);
  const list = useAsyncList({
    ...listOptions,
    load: async () => {
      const { error, data } = await getEducationYearsQuery();

      if (error || !data) {
        return { items: [] };
      }

      return { items: data.getYears };
    },
  });

  const activeEducationItems = useMemo(
    () => list.items.filter((item) => item.isEnabled),
    [list.items]
  );

  const semesterItems = useMemo(
    () =>
      activeEducationItems
        .filter((item) => selectedEducationYear === item.id)
        .flatMap((item) => {
          const { term1, term2, term3 } = item;

          return [term1, term2, term3].map((term, index) => ({
            id: index + 1,
            title:
              index === 0
                ? 'اول'
                : index === 1
                  ? 'دوم'
                  : index === 2
                    ? 'تابستان'
                    : '',
            isEnabled: term,
          }));
        })
        .filter((item) => item.isEnabled),
    [activeEducationItems, selectedEducationYear]
  );

  useEffect(() => {
    onSemesterChange?.(semesterItems);
  }, [onSemesterChange, semesterItems]);

  useEffect(() => {
    if (isMounted()) {
      list.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  return { ...list, items: activeEducationItems, semesterItems };
};

export type UseEducationYearsReturn = ReturnType<typeof useEducationYears>;
