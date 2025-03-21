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
  universityDepartmentsDocument,
  universityLevelGroupsDocument,
  universityLevelSubGroupsDocument,
  universityLevelsDocument,
  universityMajorsDocument,
  universityTypesDocument,
} from './university.query';

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
  universityDepartmentsQuery,
  universityLevelGroupsQuery,
  universityLevelSubGroupsQuery,
  universityLevelsQuery,
  universityMajorsQuery,
  universityTypesQuery,
} from './university.query';

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
  UniversityDepartmentsQueryReturn,
  UniversityLevelGroupsQueryReturn,
  UniversityLevelSubGroupsQueryReturn,
  UniversityLevelsQueryReturn,
  UniversityMajorsQueryReturn,
  UniversityTypesQueryReturn,
} from './university.query';
