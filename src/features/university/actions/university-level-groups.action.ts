'use server';

import { universityLevelGroups as universityLevelGroupsModel } from '../model';

export const universityLevelGroups = async (
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  prevState: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  formData: FormData
) => {
  try {
    const response = await universityLevelGroupsModel();

    if (!response) {
      throw new Error('Failed to university level groups.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityLevelGroups]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
