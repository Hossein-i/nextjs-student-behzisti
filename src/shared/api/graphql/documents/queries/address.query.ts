import { gql } from '@apollo/client';
import { apolloClient } from '../../base';
import {
  CountiesByProvinceQuery,
  CountiesByProvinceQueryVariables,
  DistrictsByCountyQuery,
  DistrictsByCountyQueryVariables,
  ProvincesQuery,
  ProvincesQueryVariables,
  SubDistrictsByDistrictQuery,
  SubDistrictsByDistrictQueryVariables,
} from '../../generates';

// documents
export const provincesDocument = gql`
  query provinces {
    getProvinces {
      id
      title
    }
  }
`;

export const countiesByProvinceDocument = gql`
  query countiesByProvince($dto: GetCountiesDto!) {
    getCounties(dto: $dto) {
      id
      title
    }
  }
`;

export const districtsByCountyDocument = gql`
  query districtsByCounty($dto: GetDeviationDto!) {
    getDeviatins(dto: $dto) {
      id
      title
    }
  }
`;

export const subDistrictsByDistrictDocument = gql`
  query subDistrictsByDistrict($dto: GetSubDeviationDto!) {
    getSubDeviations(dto: $dto) {
      id
      title
      type
    }
  }
`;

// queries
export const provincesQuery = async () => {
  const { data } = await apolloClient.query<
    ProvincesQuery,
    ProvincesQueryVariables
  >({
    query: provincesDocument,
  });

  return data.getProvinces;
};

export const countiesByProvinceQuery = async (
  dto: CountiesByProvinceQueryVariables['dto']
) => {
  const { provinceId } = dto;

  const { data } = await apolloClient.query<
    CountiesByProvinceQuery,
    CountiesByProvinceQueryVariables
  >({
    query: countiesByProvinceDocument,
    variables: { dto: { provinceId } },
  });

  return data.getCounties;
};

export const districtsByCountyQuery = async (
  dto: DistrictsByCountyQueryVariables['dto']
) => {
  const { countyId } = dto;

  const { data } = await apolloClient.query<
    DistrictsByCountyQuery,
    DistrictsByCountyQueryVariables
  >({
    query: districtsByCountyDocument,
    variables: { dto: { countyId } },
  });

  return data.getDeviatins;
};

export const subDistrictsByDistrictQuery = async (
  dto: SubDistrictsByDistrictQueryVariables['dto']
) => {
  const { deviationId } = dto;

  const { data } = await apolloClient.query<
    SubDistrictsByDistrictQuery,
    SubDistrictsByDistrictQueryVariables
  >({
    query: subDistrictsByDistrictDocument,
    variables: { dto: { deviationId } },
  });

  return data.getSubDeviations;
};

// types
export type ProvincesQueryReturn = Awaited<ReturnType<typeof provincesQuery>>;
export type CountiesByProvinceQueryReturn = Awaited<
  ReturnType<typeof countiesByProvinceQuery>
>;
export type DistrictsByCountyQueryReturn = Awaited<
  ReturnType<typeof districtsByCountyQuery>
>;
export type SubDistrictsByDistrictQueryReturn = Awaited<
  ReturnType<typeof subDistrictsByDistrictQuery>
>;
