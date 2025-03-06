import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import type {
  PasswordResetRequestMutation,
  PasswordResetRequestMutationVariables,
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from '../../generates';

// documents
export const signUpDocument = gql`
  mutation signUp($dto: RegisterStudentDto!) {
    registerStudent(dto: $dto) {
      id
    }
  }
`;

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

export const passwordResetRequestDocument = gql`
  mutation passwordResetRequest($nid: String!) {
    ForgotPassword(nid: $nid)
  }
`;

// mutations
export const signUpMutation = async (dto: SignUpMutationVariables['dto']) => {
  const { person, address, university } = dto;

  const { data } = await apolloClient.mutate<
    SignUpMutation,
    SignUpMutationVariables
  >({
    mutation: signUpDocument,
    variables: { dto: { person, address, university } },
  });

  if (!data) {
    return null;
  }

  return data.registerStudent;
};

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

// types
export type SignUpMutationReturn = Awaited<ReturnType<typeof signUpMutation>>;
export type SignInMutationReturn = Awaited<ReturnType<typeof signInMutation>>;
export type PasswordResetRequestMutationReturn = Awaited<
  ReturnType<typeof passwordResetRequestMutation>
>;
