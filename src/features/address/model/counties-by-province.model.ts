import { countiesByProvinceQuery } from '@/shared/api/graphql';
import 'server-only';

export type CountiesByProvinceProps = { provinceId: string };

export const countiesByProvince = async (props: CountiesByProvinceProps) => {
  try {
    const { provinceId } = props;

    const response = await countiesByProvinceQuery({ provinceId: +provinceId });

    return response;
  } catch (error) {
    console.error('[countiesByProvince]: ', error);

    return null;
  }
};
