import {
  passwordResetRequestMutation,
  signInMutation,
} from '@/shared/api/graphql';
import 'server-only';

export type AuthenticateProps = {
  username: string;
  password: string;
};

export const authenticate = async (props: AuthenticateProps) => {
  try {
    const { username, password } = props;

    const user = await signInMutation({ username, password });

    return user;
  } catch (error) {
    console.log('[authenticate]: ', error);

    return null;
  }
};

export type PasswordResetRequestProps = {
  username: string;
};

export const passwordResetRequest = async (
  props: PasswordResetRequestProps
) => {
  try {
    const { username } = props;

    const response = await passwordResetRequestMutation({ nid: username });

    if (!response) {
      throw new Error('Failed to reset password');
    }

    return response;
  } catch (error) {
    console.log('[passwordResetRequest]: ', error);

    return null;
  }
};
