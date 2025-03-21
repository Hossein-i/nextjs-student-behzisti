'use server';

import { subDistrictsByDistrict as subDistrictsByDistrictModel } from '../model';

export const subDistrictsByDistrict = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const deviationId = formData.get('deviationId')?.toString();

    if (!deviationId) {
      return { message: 'deviationId الزامی است.' };
    }

    const response = await subDistrictsByDistrictModel({ deviationId });

    if (!response) {
      throw new Error('Failed to sub districts by district.');
    }

    return { data: response };
  } catch (error) {
    console.error('[subDistrictsByDistrict]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
