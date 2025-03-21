import { universityLevelSubGroupsQuery } from '@/shared/api/graphql';
import 'server-only';

export type UniversityLevelSubGroupsProps = {
  groupId: string;
};

export const universityLevelSubGroups = async (
  props: UniversityLevelSubGroupsProps
) => {
  try {
    const { groupId } = props;

    const response = await universityLevelSubGroupsQuery({ groupId: +groupId });

    return response;
  } catch (error) {
    console.error('[universityLevelSubGroups]: ', error);

    return null;
  }
};
