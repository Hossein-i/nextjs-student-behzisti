import { gql } from '@apollo/client';

export const majorDocument = gql`
  mutation major($dto: UpdateMajorDto!) {
    UpdateMajor(dto: $dto) {
      id
    }
  }
`;

export const termDocument = gql`
  mutation term($dto: TermDto!) {
    RegisterTerm(dto: $dto) {
      id
    }
  }
`;
