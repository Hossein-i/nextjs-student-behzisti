import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  LoginMutation,
  LoginMutationVariables,
} from '../../generates';

export const authDocument = gql`
  mutation login($dto: LoginDto!) {
    Login(dto: $dto) {
      id
      firstName
      lastName
      token
    }
  }
`;

export const authMutation = async (dto: LoginMutationVariables['dto']) => {
  const { username, password } = dto;

  const { data } = await apolloClient.mutate<
    LoginMutation,
    LoginMutationVariables
  >({
    mutation: authDocument,
    variables: { dto: { username, password } },
  });

  if (!data) {
    return null;
  }

  return data.Login;
};

export const passwordResetRequestDocument = gql`
  mutation forgotPassword($nid: String!) {
    ForgotPassword(nid: $nid)
  }
`;

export const passwordResetRequestMutation = async (
  dto: ForgotPasswordMutationVariables
) => {
  const { nid } = dto;

  const { data } = await apolloClient.mutate<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >({
    mutation: passwordResetRequestDocument,
    variables: { nid },
  });

  if (!data) {
    return null;
  }

  return data.ForgotPassword;
};
