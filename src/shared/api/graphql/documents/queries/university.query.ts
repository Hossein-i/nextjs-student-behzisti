import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import type {
  UniversityDepartmentsQuery,
  UniversityDepartmentsQueryVariables,
  UniversityLevelGroupsQuery,
  UniversityLevelGroupsQueryVariables,
  UniversityLevelsQuery,
  UniversityLevelsQueryVariables,
  UniversityLevelSubGroupsQuery,
  UniversityLevelSubGroupsQueryVariables,
  UniversityMajorsQuery,
  UniversityMajorsQueryVariables,
  UniversityTypesQuery,
  UniversityTypesQueryVariables,
} from '../../generates';

// documents
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

// queries
export const universityLevelGroupsQuery = async () => {
  const { data } = await apolloClient.query<
    UniversityLevelGroupsQuery,
    UniversityLevelGroupsQueryVariables
  >({
    query: universityLevelGroupsDocument,
  });

  return data.getUniveristyLevelGroups;
};

export const universityLevelSubGroupsQuery = async (
  dto: UniversityLevelSubGroupsQueryVariables['dto']
) => {
  const { groupId } = dto;

  const { data } = await apolloClient.query<
    UniversityLevelSubGroupsQuery,
    UniversityLevelSubGroupsQueryVariables
  >({
    query: universityLevelSubGroupsDocument,
    variables: { dto: { groupId } },
  });

  return data.getUniveristyLevelSubGroups;
};

export const universityLevelsQuery = async (
  dto: UniversityLevelsQueryVariables['dto']
) => {
  const { subGroupId } = dto;

  const { data } = await apolloClient.query<
    UniversityLevelsQuery,
    UniversityLevelsQueryVariables
  >({
    query: universityLevelsDocument,
    variables: { dto: { subGroupId } },
  });

  return data.getUniversityLevels;
};

export const universityMajorsQuery = async (
  dto: UniversityMajorsQueryVariables['dto']
) => {
  const { levelId } = dto;

  const { data } = await apolloClient.query<
    UniversityMajorsQuery,
    UniversityMajorsQueryVariables
  >({
    query: universityMajorsDocument,
    variables: { dto: { levelId } },
  });

  return data.getUniversityMajors;
};

export const universityTypesQuery = async () => {
  const { data } = await apolloClient.query<
    UniversityTypesQuery,
    UniversityTypesQueryVariables
  >({
    query: universityTypesDocument,
  });

  return data.getUniversityTypes;
};

export const universityDepartmentsQuery = async (
  dto: UniversityDepartmentsQueryVariables['dto']
) => {
  const { countyId, typeId } = dto;

  const { data } = await apolloClient.query<
    UniversityDepartmentsQuery,
    UniversityDepartmentsQueryVariables
  >({
    query: universityDepartmentsDocument,
    variables: { dto: { countyId, typeId } },
  });

  return data.getUniversityDepartments;
};

// types
export type UniversityLevelGroupsQueryReturn = Awaited<
  ReturnType<typeof universityLevelGroupsQuery>
>;
export type UniversityLevelSubGroupsQueryReturn = Awaited<
  ReturnType<typeof universityLevelSubGroupsQuery>
>;
export type UniversityLevelsQueryReturn = Awaited<
  ReturnType<typeof universityLevelsQuery>
>;
export type UniversityMajorsQueryReturn = Awaited<
  ReturnType<typeof universityMajorsQuery>
>;
export type UniversityTypesQueryReturn = Awaited<
  ReturnType<typeof universityTypesQuery>
>;
export type UniversityDepartmentsQueryReturn = Awaited<
  ReturnType<typeof universityDepartmentsQuery>
>;
