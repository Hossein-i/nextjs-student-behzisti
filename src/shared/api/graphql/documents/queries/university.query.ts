import { gql } from '@apollo/client';

export const universityLevelGroupsDocument = gql`
  query universityLevelGroups {
    getUniveristyLevelGroups {
      id
      title
    }
  }
`;

export const universityLevelSubGroupsDocument = gql`
  query universityLevelSubGroups($dto: GetUniversitySubGroupDto!) {
    getUniveristyLevelSubGroups(dto: $dto) {
      id
      title
    }
  }
`;

export const universityLevelsDocument = gql`
  query universityLevels($dto: GetUniversityLevelDto!) {
    getUniversityLevels(dto: $dto) {
      id
      title
    }
  }
`;

export const universityMajorsDocument = gql`
  query universityMajors($dto: GetUniversityMajorsDto!) {
    getUniversityMajors(dto: $dto) {
      id
      title
    }
  }
`;

export const universityTypesDocument = gql`
  query universityTypes {
    getUniversityTypes {
      id
      title
    }
  }
`;

export const universityDepartmentsDocument = gql`
  query universityDepartments($dto: GetUniversityDepartmentDto!) {
    getUniversityDepartments(dto: $dto) {
      id
      title
    }
  }
`;
