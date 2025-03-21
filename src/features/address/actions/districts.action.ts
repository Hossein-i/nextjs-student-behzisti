'use server';

import { districtsByCounty as districtsByCountyModel } from '../model';

export const districtsByCounty = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const countyId = formData.get('countyId')?.toString();

    if (!countyId) {
      return { message: 'countyId الزامی است.' };
    }

    const response = await districtsByCountyModel({ countyId });

    if (!response) {
      throw new Error('Failed to districts by county.');
    }

    return { data: response };
  } catch (error) {
    console.error('[districtsByCounty]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
