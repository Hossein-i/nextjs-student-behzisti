import { universityLevelsQuery } from '@/shared/api/graphql';
import 'server-only';

export type UniversityLevelsProps = {
  subGroupId: string;
};

export const universityLevels = async (props: UniversityLevelsProps) => {
  try {
    const { subGroupId } = props;

    const response = await universityLevelsQuery({ subGroupId: +subGroupId });

    return response;
  } catch (error) {
    console.error('[universityLevels]: ', error);

    return null;
  }
};
