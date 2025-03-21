import { districtsByCountyQuery } from '@/shared/api/graphql';
import 'server-only';

export type DistrictsByCountyProps = { countyId: string };

export const districtsByCounty = async (props: DistrictsByCountyProps) => {
  try {
    const { countyId } = props;

    const response = await districtsByCountyQuery({ countyId: +countyId });

    return response;
  } catch (error) {
    console.error('[districtsByCounty]: ', error);

    return null;
  }
};
