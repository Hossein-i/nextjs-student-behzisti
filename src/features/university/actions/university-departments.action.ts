'use server';

import { universityDepartments as universityDepartmentsModel } from '../model';

export const universityDepartments = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const countyId = formData.get('countyId')?.toString();
    const typeId = formData.get('typeId')?.toString();

    if (!countyId || !typeId) {
      return {
        message: 'countyId و typeId الزامی است.',
      };
    }

    const response = await universityDepartmentsModel({ countyId, typeId });

    if (!response) {
      throw new Error('Failed to university departments.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityDepartments]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
