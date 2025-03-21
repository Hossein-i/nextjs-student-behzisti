'use server';

import { universityMajors as universityMajorsModel } from '../model';

export const universityMajors = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const levelId = formData.get('levelId')?.toString();

    if (!levelId) {
      return {
        message: 'levelId الزامی است.',
      };
    }

    const response = await universityMajorsModel({ levelId });

    if (!response) {
      throw new Error('Failed to university majors.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityMajors]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
