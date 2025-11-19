import { gql } from '@apollo/client';

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
        id
        title
        level {
          title
        }
      }
      department {
        id
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

export const educationYearsDocument = gql`
  query getEducationYears {
    getYears {
      id
      title
      isEnabled
      term1
      term2
      term3
    }
  }
`;
