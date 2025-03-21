import { subDistrictsByDistrictQuery } from '@/shared/api/graphql';
import 'server-only';

export type SubDistrictsByDistrictProps = { deviationId: string };

export const subDistrictsByDistrict = async (
  props: SubDistrictsByDistrictProps
) => {
  try {
    const { deviationId } = props;

    const response = await subDistrictsByDistrictQuery({
      deviationId: +deviationId,
    });

    return response;
  } catch (error) {
    console.error('[subDistrictsByDistrict]: ', error);

    return null;
  }
};
