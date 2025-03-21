'use server';

import { redirect } from 'next/navigation';
import { getSession } from '../api';
import { defaultLoginRedirect } from '../constants';
import { type Authenticate, authenticateSchema } from '../lib/validations';
import { authenticate } from '../model';
import type { UserSession } from '../types';

export const signIn = async (prevState: unknown, formData: FormData) => {
  try {
    const variables: Partial<Authenticate> = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const validatedFields = await authenticateSchema.safeParseAsync(variables);

    if (!validatedFields.success) {
      return {
        message: 'خطای اعتبارسنجی!',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await authenticate(validatedFields.data);

    if (!user || !user.token) {
      return { message: 'نام کاربری یا رمز عبور اشتباه می باشد.' };
    }

    const userSession: UserSession = {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      },
    };
    const session = await getSession();
    session.user = userSession.user;
    await session.save();
  } catch (error) {
    console.error('[signIn]: ', error);

    return { message: 'خطای سمت سرور!' };
  }

  redirect(defaultLoginRedirect);
};
