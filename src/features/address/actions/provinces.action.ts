'use server';

import { provinces as provincesModel } from '../model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const provinces = async (prevState: unknown, formData: FormData) => {
  try {
    const response = await provincesModel();

    if (!response) {
      throw new Error('Failed to provinces.');
    }

    return { data: response };
  } catch (error) {
    console.error('[provinces]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
