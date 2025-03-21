'use server';

import { redirect } from 'next/navigation';
import { defaultAuthRedirect } from '../constants';
import {
  type PasswordResetRequest,
  passwordResetRequestSchema,
} from '../lib/validations';
import { passwordResetRequest as passwordResetRequestModel } from '../model';

export const passwordResetRequest = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    const variables: Partial<PasswordResetRequest> = {
      username: formData.get('username') as string,
    };

    const validatedFields =
      await passwordResetRequestSchema.safeParseAsync(variables);

    if (!validatedFields.success) {
      return {
        message: 'خطای اعتبارسنجی!',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await passwordResetRequestModel(validatedFields.data);

    if (!response || response.success === false) {
      return { message: 'نام کاربری اشتباه می باشد.' };
    }
  } catch (error) {
    console.error('[forgetPassword]: ', error);

    return { message: 'خطای سمت سرور!' };
  }

  redirect(defaultAuthRedirect);
};
