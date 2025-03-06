// documents
export {
  countiesByProvinceDocument,
  districtsByCountyDocument,
  provincesDocument,
  subDistrictsByDistrictDocument,
} from './address.query';
export { inquiryDocument } from './auth.query';
export {
  educationLevelsDocument,
  termsByEducationLevelDocument,
} from './education.query';
export {
  univeristyLevelGroupsDocument,
  univeristyLevelSubGroupsDocument,
  univeristyTypesDocument,
  universityDepartmentsDocument,
  universityLevelsDocument,
  universityMajorsDocument,
} from './univeristy.query';

// queries
export {
  countiesByProvinceQuery,
  districtsByCountyQuery,
  provincesQuery,
  subDistrictsByDistrictQuery,
} from './address.query';
export { inquiryQuery } from './auth.query';
export {
  educationLevelsQuery,
  termsByEducationLevelQuery,
} from './education.query';
export {
  univeristyLevelGroupsQuery,
  univeristyLevelSubGroupsQuery,
  univeristyTypesQuery,
  universityDepartmentsQuery,
  universityLevelsQuery,
  universityMajorsQuery,
} from './univeristy.query';

// types
export type {
  CountiesByProvinceQueryReturn,
  DistrictsByCountyQueryReturn,
  ProvincesQueryReturn,
  SubDistrictsByDistrictQueryReturn,
} from './address.query';
export type { InquiryQueryReturn } from './auth.query';
export type {
  EducationLevelsQueryReturn,
  TermsByEducationLevelQueryReturn,
} from './education.query';
export type {
  UniveristyLevelGroupsQueryReturn,
  UniveristyLevelSubGroupsQueryReturn,
  UniveristyTypesQueryReturn,
  UniversityDepartmentsQueryReturn,
  UniversityLevelsQueryReturn,
  UniversityMajorsQueryReturn,
} from './univeristy.query';
