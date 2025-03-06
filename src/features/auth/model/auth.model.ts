import {
  authMutation,
  passwordResetRequestMutation,
} from '@/shared/api/graphql';
import 'server-only';

export type AuthenticateProps = {
  username: string;
  password: string;
};

export const authenticate = async (props: AuthenticateProps) => {
  try {
    const { username, password } = props;

    const user = await authMutation({ username, password });

    return user;
  } catch (error) {
    console.log('[authenticate]: ', error);

    return null;
  }
};

export type AuthenticateReturn = ReturnType<typeof authenticate>;

export type RequestPasswordResetProps = {
  username: string;
};

export const passwordResetRequest = async (
  props: RequestPasswordResetProps
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

export type RequestPasswordResetReturn = ReturnType<
  typeof passwordResetRequest
>;
