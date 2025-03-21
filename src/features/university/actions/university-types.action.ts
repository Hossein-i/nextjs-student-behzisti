'use server';

import { universityTypes as universityTypesModel } from '../model';

export const universityTypes = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  prevState: unknown,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  formData: FormData
) => {
  try {
    const response = await universityTypesModel();

    if (!response) {
      throw new Error('Failed to university types.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityTypes]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
