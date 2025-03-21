import { passwordResetRequestMutation } from '@/shared/api/graphql';
import 'server-only';

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
    console.error('[passwordResetRequest]: ', error);

    return null;
  }
};
