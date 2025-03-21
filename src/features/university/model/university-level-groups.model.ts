import { universityLevelGroupsQuery } from '@/shared/api/graphql';
import 'server-only';

export const universityLevelGroups = async () => {
  try {
    const response = await universityLevelGroupsQuery();

    return response;
  } catch (error) {
    console.error('[universityLevelGroups]: ', error);

    return null;
  }
};
