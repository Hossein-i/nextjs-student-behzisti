import { gql } from '@apollo/client';

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
