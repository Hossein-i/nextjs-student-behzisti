'use server';

import { countiesByProvince as countiesByProvinceModel } from '../model';

export const countiesByProvince = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const provinceId = formData.get('provinceId')?.toString();

    if (!provinceId) {
      return { message: 'provinceId الزامی است.' };
    }

    const response = await countiesByProvinceModel({ provinceId });

    if (!response) {
      throw new Error('Failed to counties by province.');
    }

    return { data: response };
  } catch (error) {
    console.error('[countiesByProvince]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
