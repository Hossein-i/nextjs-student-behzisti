import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import type {
  UniveristyLevelGroupsQuery,
  UniveristyLevelGroupsQueryVariables,
  UniveristyLevelSubGroupsQuery,
  UniveristyLevelSubGroupsQueryVariables,
  UniveristyTypesQuery,
  UniveristyTypesQueryVariables,
  UniversityDepartmentsQuery,
  UniversityDepartmentsQueryVariables,
  UniversityLevelsQuery,
  UniversityLevelsQueryVariables,
  UniversityMajorsQuery,
  UniversityMajorsQueryVariables,
} from '../../generates';

// documents
export const univeristyLevelGroupsDocument = gql`
  query univeristyLevelGroups {
    getUniveristyLevelGroups {
      id
      title
    }
  }
`;

export const univeristyLevelSubGroupsDocument = gql`
  query univeristyLevelSubGroups($dto: GetUniversitySubGroupDto!) {
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

export const univeristyTypesDocument = gql`
  query univeristyTypes {
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
export const univeristyLevelGroupsQuery = async () => {
  const { data } = await apolloClient.query<
    UniveristyLevelGroupsQuery,
    UniveristyLevelGroupsQueryVariables
  >({
    query: univeristyLevelGroupsDocument,
  });

  return data.getUniveristyLevelGroups;
};

export const univeristyLevelSubGroupsQuery = async (
  dto: UniveristyLevelSubGroupsQueryVariables['dto']
) => {
  const { groupId } = dto;

  const { data } = await apolloClient.query<
    UniveristyLevelSubGroupsQuery,
    UniveristyLevelSubGroupsQueryVariables
  >({
    query: univeristyLevelSubGroupsDocument,
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

export const univeristyTypesQuery = async () => {
  const { data } = await apolloClient.query<
    UniveristyTypesQuery,
    UniveristyTypesQueryVariables
  >({
    query: univeristyTypesDocument,
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
export type UniveristyLevelGroupsQueryReturn = Awaited<
  ReturnType<typeof univeristyLevelGroupsQuery>
>;
export type UniveristyLevelSubGroupsQueryReturn = Awaited<
  ReturnType<typeof univeristyLevelSubGroupsQuery>
>;
export type UniversityLevelsQueryReturn = Awaited<
  ReturnType<typeof universityLevelsQuery>
>;
export type UniversityMajorsQueryReturn = Awaited<
  ReturnType<typeof universityMajorsQuery>
>;
export type UniveristyTypesQueryReturn = Awaited<
  ReturnType<typeof univeristyTypesQuery>
>;
export type UniversityDepartmentsQueryReturn = Awaited<
  ReturnType<typeof universityDepartmentsQuery>
>;
