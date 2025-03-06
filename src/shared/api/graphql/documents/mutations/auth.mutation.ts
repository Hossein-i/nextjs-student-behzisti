import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import {
  PasswordResetRequestMutation,
  PasswordResetRequestMutationVariables,
  SignInMutation,
  SignInMutationVariables,
} from '../../generates';

export const signInDocument = gql`
  mutation signIn($dto: LoginDto!) {
    Login(dto: $dto) {
      id
      firstName
      lastName
      token
    }
  }
`;

export const signInMutation = async (dto: SignInMutationVariables['dto']) => {
  const { username, password } = dto;

  const { data } = await apolloClient.mutate<
    SignInMutation,
    SignInMutationVariables
  >({
    mutation: signInDocument,
    variables: { dto: { username, password } },
  });

  if (!data) {
    return null;
  }

  return data.Login;
};

export type SignInMutationReturn = ReturnType<typeof signInMutation>;

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
