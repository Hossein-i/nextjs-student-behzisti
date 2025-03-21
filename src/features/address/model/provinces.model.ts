import { provincesQuery } from '@/shared/api/graphql';
import 'server-only';

export const provinces = async () => {
  try {
    const response = await provincesQuery();

    return response;
  } catch (error) {
    console.error('[provinces]: ', error);

    return null;
  }
};
