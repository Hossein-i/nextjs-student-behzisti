import { signInMutation } from '@/shared/api/graphql';
import 'server-only';

export type AuthenticateProps = {
  username: string;
  password: string;
};

export const authenticate = async (props: AuthenticateProps) => {
  try {
    const { username, password } = props;

    const response = await signInMutation({ username, password });

    if (!response) {
      throw new Error('Failed to authenticate');
    }

    return response;
  } catch (error) {
    console.error('[authenticate]: ', error);

    return null;
  }
};
