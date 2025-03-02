import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation login($dto: LoginDto!) {
    Login(dto: $dto) {
      id
      firstName
      lastName
      token
    }
  }
`;
