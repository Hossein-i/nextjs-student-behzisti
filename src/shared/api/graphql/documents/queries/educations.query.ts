import { gql } from '@apollo/client';

export const educationsQuery = gql`
  query getDetails {
    getDetails {
      id
      studentNumber
      UniversityAcceptanceDate
      major {
        title
        level {
          title
        }
      }
      department {
        title
        type {
          title
        }
      }
    }
  }
`;
