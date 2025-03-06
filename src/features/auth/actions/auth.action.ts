'use server';

import { redirect } from 'next/navigation';
import { getSession } from '../api';
import { defaultAuthRedirect, defaultLoginRedirect } from '../constants';
import {
  Credentials,
  credentialsSchema,
  PasswordResetRequest,
  passwordResetRequestSchema,
} from '../lib';
import { authenticate, passwordResetRequest } from '../model';
import { ForgetPasswordState, SignInFormState, UserSession } from '../types';

export const signIn = async (
  prevState: SignInFormState,
  formData: FormData
) => {
  try {
    const variables: Partial<Credentials> = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const validatedFields = await credentialsSchema.safeParseAsync(variables);

    if (!validatedFields.success) {
      return {
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
    console.log('[signIn]: ', error);

    return { message: 'خطای سمت سرور!' };
  }

  redirect(defaultLoginRedirect);
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect(defaultAuthRedirect);
};

export const forgetPassword = async (
  prevState: ForgetPasswordState,
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
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await passwordResetRequest(validatedFields.data);

    if (!response || response.success === false) {
      return { message: 'نام کاربری اشتباه می باشد.' };
    }
  } catch (error) {
    console.log('[forgetPassword]: ', error);

    return { message: 'خطای سمت سرور!' };
  }

  redirect(defaultAuthRedirect);
};
