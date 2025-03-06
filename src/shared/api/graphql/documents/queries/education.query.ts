import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import {
  GetEducationLevelsQuery,
  GetEducationLevelsQueryVariables,
  GetTermsByEducationLevelQuery,
  GetTermsByEducationLevelQueryVariables,
} from '../../generates';

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

export const educationLevelsQuery = async () => {
  const data = await apolloClient.query<
    GetEducationLevelsQuery,
    GetEducationLevelsQueryVariables
  >({
    query: educationLevelsDocument,
  });

  if (!data) {
    return null;
  }

  return data.data.getDetails;
};

export type EducationLevelsQueryReturn = ReturnType<
  typeof educationLevelsQuery
>;

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

export const termsByEducationLevelQuery = async (
  dto: GetTermsByEducationLevelQueryVariables
) => {
  const { eid } = dto;

  const data = await apolloClient.query<
    GetTermsByEducationLevelQuery,
    GetTermsByEducationLevelQueryVariables
  >({
    query: termsByEducationLevelDocument,
    variables: { eid },
  });

  if (!data) {
    return null;
  }

  return data.data.getTerms;
};

export type TermsByEducationLevelQueryReturn = ReturnType<
  typeof termsByEducationLevelQuery
>;
