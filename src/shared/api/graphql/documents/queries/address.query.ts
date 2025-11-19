import { gql } from '@apollo/client';

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
