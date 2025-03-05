import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import {
  AuthMutation,
  AuthMutationVariables,
  PasswordResetRequestMutation,
  PasswordResetRequestMutationVariables,
} from '../../generates';

export const authDocument = gql`
  mutation auth($dto: LoginDto!) {
    Login(dto: $dto) {
      id
      firstName
      lastName
      token
    }
  }
`;

export const authMutation = async (dto: AuthMutationVariables['dto']) => {
  const { username, password } = dto;

  const { data } = await apolloClient.mutate<
    AuthMutation,
    AuthMutationVariables
  >({
    mutation: authDocument,
    variables: { dto: { username, password } },
  });

  if (!data) {
    return null;
  }

  return data.Login;
};

export type AuthMutationReturn = ReturnType<typeof authMutation>;

export const passwordResetRequestDocument = gql`
  mutation passwordResetRequest($nid: String!) {
    ForgotPassword(nid: $nid)
  }
`;

export const passwordResetRequestMutation = async (
  dto: PasswordResetRequestMutationVariables
) => {
  const { nid } = dto;

  const { data } = await apolloClient.mutate<
    PasswordResetRequestMutation,
    PasswordResetRequestMutationVariables
  >({
    mutation: passwordResetRequestDocument,
    variables: { nid },
  });

  if (!data) {
    return null;
  }

  return { success: data.ForgotPassword };
};

export type PasswordResetRequestMutationReturn = ReturnType<
  typeof passwordResetRequestMutation
>;
