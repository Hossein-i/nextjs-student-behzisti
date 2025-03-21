'use server';

import { redirect } from 'next/navigation';
import { defaultAuthRedirect } from '../constants';
import { type SignUp, signUpSchema } from '../lib/validations';
import { signUp as signUpModel } from '../model';

export const signUp = async (prevState: unknown, formData: FormData) => {
  try {
    const variables: Partial<SignUp> = {
      person: JSON.parse(formData.get('person')?.toString() || '{}'),
      address: JSON.parse(formData.get('address')?.toString() || '{}'),
      university: JSON.parse(formData.get('university')?.toString() || '{}'),
    };

    const validatedFields = await signUpSchema.safeParseAsync(variables);

    if (!validatedFields.success) {
      return {
        message: 'خطای اعتبارسنجی!',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await signUpModel(validatedFields.data);

    if (!response) {
      throw new Error('Failed to sign up.');
    }
  } catch (error) {
    console.error('[signUp]: ', error);

    return { message: 'خطای سمت سرور!' };
  }

  redirect(defaultAuthRedirect);
};
