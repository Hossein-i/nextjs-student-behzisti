import { universityTypesQuery } from '@/shared/api/graphql';
import 'server-only';

export const universityTypes = async () => {
  try {
    const response = await universityTypesQuery();

    return response;
  } catch (error) {
    console.error('[universityTypes]: ', error);

    return null;
  }
};
