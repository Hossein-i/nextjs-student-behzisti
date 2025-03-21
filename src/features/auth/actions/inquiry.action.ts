'use server';

import { type Inquiry, inquirySchema } from '../lib/validations';
import { inquiry as inquiryModel } from '../model';

export const inquiry = async (prevState: unknown, formData: FormData) => {
  try {
    const variables: Partial<Inquiry> = {
      nid: formData.get('nid') as string,
      birthDate: formData.get('birthDate') as string,
    };

    const validatedFields = await inquirySchema.safeParseAsync(variables);

    if (!validatedFields.success) {
      return {
        message: 'خطای اعتبارسنجی!',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await inquiryModel(validatedFields.data);

    if (!response) {
      throw new Error('Failed to inquiry');
    }

    return { data: response };
  } catch (error) {
    console.error('[inquiry]: ', error);

    return { message: 'خطای سمت سرور!' };
  }
};
