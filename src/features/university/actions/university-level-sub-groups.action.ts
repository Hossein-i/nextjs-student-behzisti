'use server';

import { universityLevelSubGroups as universityLevelSubGroupsModel } from '../model';

export const universityLevelSubGroups = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const groupId = formData.get('groupId')?.toString();

    if (!groupId) {
      return {
        message: 'groupId الزامی است.',
      };
    }

    const response = await universityLevelSubGroupsModel({ groupId });

    if (!response) {
      throw new Error('Failed to university level sub groups.');
    }

    return { data: response };
  } catch (error) {
    console.error('[universityLevelSubGroups]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
