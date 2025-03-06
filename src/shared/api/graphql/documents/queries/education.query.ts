import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import type {
  GetEducationLevelsQuery,
  GetEducationLevelsQueryVariables,
  GetTermsByEducationLevelQuery,
  GetTermsByEducationLevelQueryVariables,
} from '../../generates';

// documents
export const educationLevelsDocument = gql`
  query getEducationLevels {
    getDetails {
      id
      studentNumber
      UniversityAcceptanceDate
      student {
        id
        firstName
        lastName
        nid
        birthDate
      }
      major {
        title
        level {
          title
        }
      }
      department {
        title
        type {
          id
          title
        }
      }
    }
  }
`;

export const termsByEducationLevelDocument = gql`
  query getTermsByEducationLevel($eid: Float!) {
    getTerms(detail: $eid) {
      id
      detail {
        id
        studentNumber
        UniversityAcceptanceDate
        student {
          id
          firstName
          lastName
          nid
          birthDate
        }
        major {
          title
          level {
            title
          }
        }
        department {
          title
          type {
            id
            title
          }
        }
      }
      year {
        id
        title
      }
      semister
      cost {
        fixed
        variable
        total
      }
      unit
      account {
        IBN
        number: Number
        CARD
      }
      MadadkarAcceptance
    }
  }
`;

// queries
export const educationLevelsQuery = async () => {
  const { data } = await apolloClient.query<
    GetEducationLevelsQuery,
    GetEducationLevelsQueryVariables
  >({
    query: educationLevelsDocument,
  });

  return data.getDetails;
};

export const termsByEducationLevelQuery = async (
  dto: GetTermsByEducationLevelQueryVariables
) => {
  const { eid } = dto;

  const { data } = await apolloClient.query<
    GetTermsByEducationLevelQuery,
    GetTermsByEducationLevelQueryVariables
  >({
    query: termsByEducationLevelDocument,
    variables: { eid },
  });

  return data.getTerms;
};

// types
export type EducationLevelsQueryReturn = Awaited<
  ReturnType<typeof educationLevelsQuery>
>;
export type TermsByEducationLevelQueryReturn = Awaited<
  ReturnType<typeof termsByEducationLevelQuery>
>;
