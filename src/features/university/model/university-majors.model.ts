import { universityMajorsQuery } from '@/shared/api/graphql';
import 'server-only';

export type UniversityMajorsProps = {
  levelId: string;
};

export const universityMajors = async (props: UniversityMajorsProps) => {
  try {
    const { levelId } = props;

    const response = await universityMajorsQuery({ levelId: +levelId });

    return response;
  } catch (error) {
    console.error('[universityMajors]: ', error);

    return null;
  }
};
