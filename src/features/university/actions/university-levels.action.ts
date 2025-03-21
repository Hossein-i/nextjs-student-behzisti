'use server';

import { universityLevels as universityLevelsModel } from '../model';

export const universityLevels = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const subGroupId = formData.get('subGroupId')?.toString();

    if (!subGroupId) {
      return {
        message: 'subGroupId الزامی است.',
      };
    }

    const response = await universityLevelsModel({ subGroupId });

    if (!response) {
      throw new Error('Failed to university levels.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityLevels]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
