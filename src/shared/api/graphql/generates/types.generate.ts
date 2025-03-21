/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import type {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type AcceptanceDto = {
  checkList: CheckListDto;
  folderId: Scalars['Float']['input'];
};

export type AccountDetail = {
  __typename?: 'AccountDetail';
  CARD: Scalars['String']['output'];
  IBN: Scalars['String']['output'];
  Number: Scalars['String']['output'];
};

export type AccountDto = {
  CARD: Scalars['String']['input'];
  IBN: Scalars['String']['input'];
  number: Scalars['String']['input'];
};

export type AddressDto = {
  AddressLine1: Scalars['String']['input'];
  county: Scalars['String']['input'];
  deviation: Scalars['String']['input'];
  province: Scalars['String']['input'];
  subDeviation: Scalars['String']['input'];
};

export type AuthenticationDto = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type BasicItem = {
  __typename?: 'BasicItem';
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ChangeCellphoneDto = {
  cellphone: Scalars['String']['input'];
  studentId: Scalars['Float']['input'];
};

export type ChangeLiveLocationDto = {
  locationId: Scalars['Float']['input'];
  studentId: Scalars['Float']['input'];
};

export type CheckListDto = {
  c1?: InputMaybe<Scalars['String']['input']>;
  c2?: InputMaybe<Scalars['String']['input']>;
  c3?: InputMaybe<Scalars['String']['input']>;
  c4?: InputMaybe<Scalars['String']['input']>;
  c5?: InputMaybe<Scalars['String']['input']>;
  c6?: InputMaybe<Scalars['String']['input']>;
  c7?: InputMaybe<Scalars['String']['input']>;
  c8?: InputMaybe<Scalars['String']['input']>;
  c9?: InputMaybe<Scalars['String']['input']>;
  c10?: InputMaybe<Scalars['String']['input']>;
  c11?: InputMaybe<Scalars['String']['input']>;
};

export type Cost = {
  __typename?: 'Cost';
  fixed: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  variable: Scalars['Float']['output'];
};

export type CostDto = {
  fixed: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
  variable: Scalars['Float']['input'];
};

export type County = {
  __typename?: 'County';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  province: Province;
  title: Scalars['String']['output'];
};

export type Deviation = {
  __typename?: 'Deviation';
  county: County;
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type EducationDetail = {
  __typename?: 'EducationDetail';
  UniversityAcceptanceDate: Scalars['DateTime']['output'];
  creationDateTime: Scalars['DateTime']['output'];
  department: UniversityDepartment;
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  major: UniversityMajor;
  student: Student;
  studentNumber: Scalars['String']['output'];
  terms?: Maybe<Array<Term>>;
};

export type EstelamResult = {
  __typename?: 'EstelamResult';
  family: Scalars['String']['output'];
  fatherName: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FileContent = {
  __typename?: 'FileContent';
  content?: Maybe<Scalars['String']['output']>;
  encoding?: Maybe<Scalars['String']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FoldersResult = {
  __typename?: 'FoldersResult';
  CP: Scalars['Float']['output'];
  Commision: Scalars['Float']['output'];
  Emdad: Scalars['Float']['output'];
  EmdadTakhis: Scalars['Float']['output'];
  Farzan: Scalars['Float']['output'];
  Rehab: Scalars['Float']['output'];
  RehabChild: Scalars['Float']['output'];
  Zanan: Scalars['Float']['output'];
  ZananChild: Scalars['Float']['output'];
  ZananPosht: Scalars['Float']['output'];
  ZananPoshtChild: Scalars['Float']['output'];
  ZananTarkhis: Scalars['Float']['output'];
  ZananTarkhisChild: Scalars['Float']['output'];
};

export type GetCountiesDto = {
  provinceId: Scalars['Float']['input'];
};

export type GetDeviationDto = {
  countyId: Scalars['Float']['input'];
};

export type GetEstelamDto = {
  birthDate: Scalars['String']['input'];
  nid: Scalars['String']['input'];
};

export type GetStudentDto = {
  county?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Float']['input']>;
  nid?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type GetSubDeviationDto = {
  deviationId: Scalars['Float']['input'];
};

export type GetTermsListDto = {
  countyId?: InputMaybe<Scalars['Float']['input']>;
  departmentType?: InputMaybe<Scalars['Float']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<TermsStatus>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type GetUniversityDepartmentDto = {
  countyId: Scalars['Float']['input'];
  typeId: Scalars['Float']['input'];
};

export type GetUniversityLevelDto = {
  subGroupId: Scalars['Float']['input'];
};

export type GetUniversityMajorsDto = {
  levelId: Scalars['Float']['input'];
};

export type GetUniversitySubGroupDto = {
  groupId: Scalars['Float']['input'];
};

export type GetUsersDto = {
  county?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginDto = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AcceptTransaction: Scalars['Boolean']['output'];
  Authenticate: User;
  CalculateTransaction: Scalars['Boolean']['output'];
  ChangeCity: Student;
  DeleteTransaction: Scalars['Boolean']['output'];
  ForgotPassword: Scalars['Boolean']['output'];
  Login: Student;
  RegisterDepartment: UniversityDepartment;
  RegisterGroup: UniversityLevelGroup;
  RegisterLevel: UniversityLevel;
  RegisterReshte: UniversityMajor;
  RegisterSubGroup: UniversityLevelSubGroup;
  RegisterTerm: Term;
  RegisterTransaction: Transaction;
  RegisterYear: Year;
  UpdateMajor: EducationDetail;
  accept: Term;
  acceptModir: Term;
  chaneCellphone: Student;
  checkList: Term;
  deleteTerm: Scalars['Boolean']['output'];
  registerStudent: Student;
  registerUser: User;
  removeAdminTerm: Scalars['Boolean']['output'];
  removeShahrestan: Term;
};

export type MutationAcceptTransactionArgs = {
  id: Scalars['Float']['input'];
};

export type MutationAuthenticateArgs = {
  dto: AuthenticationDto;
};

export type MutationCalculateTransactionArgs = {
  id: Scalars['Float']['input'];
};

export type MutationChangeCityArgs = {
  dto: ChangeLiveLocationDto;
};

export type MutationDeleteTransactionArgs = {
  id: Scalars['Float']['input'];
};

export type MutationForgotPasswordArgs = {
  nid: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  dto: LoginDto;
};

export type MutationRegisterDepartmentArgs = {
  dto: RegisterDepartmentDto;
};

export type MutationRegisterGroupArgs = {
  dto: RegisterGroupDto;
};

export type MutationRegisterLevelArgs = {
  dto: RegisterLevelDto;
};

export type MutationRegisterReshteArgs = {
  dto: RegisterMajorDto;
};

export type MutationRegisterSubGroupArgs = {
  dto: RegisterSubGroupDto;
};

export type MutationRegisterTermArgs = {
  dto: TermDto;
};

export type MutationRegisterTransactionArgs = {
  dto: RegisterTransactionDto;
};

export type MutationRegisterYearArgs = {
  dto: RegisterYearDto;
};

export type MutationUpdateMajorArgs = {
  dto: UpdateMajorDto;
};

export type MutationAcceptArgs = {
  id: Scalars['Float']['input'];
};

export type MutationAcceptModirArgs = {
  id: Scalars['Float']['input'];
};

export type MutationChaneCellphoneArgs = {
  dto: ChangeCellphoneDto;
};

export type MutationCheckListArgs = {
  dto: AcceptanceDto;
};

export type MutationDeleteTermArgs = {
  id: Scalars['Float']['input'];
};

export type MutationRegisterStudentArgs = {
  dto: RegisterStudentDto;
};

export type MutationRegisterUserArgs = {
  dto: RegisterUserDto;
};

export type MutationRemoveAdminTermArgs = {
  id: Scalars['Float']['input'];
};

export type MutationRemoveShahrestanArgs = {
  id: Scalars['Float']['input'];
};

export type PersonDto = {
  birthDate: Scalars['String']['input'];
  cellphone: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  nid: Scalars['String']['input'];
};

export type Province = {
  __typename?: 'Province';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  Version: Scalars['String']['output'];
  getCounties: Array<County>;
  getDetails: Array<EducationDetail>;
  getDeviatins: Array<Deviation>;
  getEstelam: EstelamResult;
  getFolder: Array<FoldersResult>;
  getProvinces: Array<Province>;
  /** RegistrationReason */
  getRegistrationReason: Array<BasicItem>;
  getReport: Array<ReportStudentDto>;
  getReportByFolder: Array<ReportStudentByFolderDto>;
  getStudents: Array<Student>;
  getSubDeviations: Array<SubDeviation>;
  getTerms: Array<Term>;
  getTermsList: Array<Term>;
  getTransactions: Array<Transaction>;
  getUniveristyLevelGroups: Array<UniversityLevelGroup>;
  getUniveristyLevelSubGroups: Array<UniversityLevelSubGroup>;
  getUniversityDepartments: Array<UniversityDepartment>;
  getUniversityLevels: Array<UniversityLevel>;
  getUniversityMajors: Array<UniversityMajor>;
  getUniversityTypes: Array<UniversityType>;
  getUsers: Array<User>;
  getYears: Array<Year>;
  searchMajor: Array<UniversityMajor>;
};

export type QueryGetCountiesArgs = {
  dto: GetCountiesDto;
};

export type QueryGetDeviatinsArgs = {
  dto: GetDeviationDto;
};

export type QueryGetEstelamArgs = {
  dto: GetEstelamDto;
};

export type QueryGetFolderArgs = {
  nid: Scalars['String']['input'];
};

export type QueryGetStudentsArgs = {
  dto: GetStudentDto;
};

export type QueryGetSubDeviationsArgs = {
  dto: GetSubDeviationDto;
};

export type QueryGetTermsArgs = {
  detail?: InputMaybe<Scalars['Float']['input']>;
};

export type QueryGetTermsListArgs = {
  dto: GetTermsListDto;
};

export type QueryGetUniveristyLevelSubGroupsArgs = {
  dto: GetUniversitySubGroupDto;
};

export type QueryGetUniversityDepartmentsArgs = {
  dto: GetUniversityDepartmentDto;
};

export type QueryGetUniversityLevelsArgs = {
  dto: GetUniversityLevelDto;
};

export type QueryGetUniversityMajorsArgs = {
  dto: GetUniversityMajorsDto;
};

export type QueryGetUsersArgs = {
  dto: GetUsersDto;
};

export type QuerySearchMajorArgs = {
  title: Scalars['String']['input'];
};

export type RegisterDepartmentDto = {
  countyId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  typeId: Scalars['Float']['input'];
};

export type RegisterGroupDto = {
  title: Scalars['String']['input'];
};

export type RegisterLevelDto = {
  subgroup: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type RegisterMajorDto = {
  level: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type RegisterStudentDto = {
  address: AddressDto;
  id?: InputMaybe<Scalars['Float']['input']>;
  person: PersonDto;
  reason?: InputMaybe<RegistrationReason>;
  university: UniversityDto;
};

export type RegisterSubGroupDto = {
  group: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type RegisterTransactionDto = {
  id?: InputMaybe<Scalars['Float']['input']>;
  priority?: InputMaybe<TransactionPriority>;
  semister: Scalars['Float']['input'];
  threshold?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  year: Scalars['Float']['input'];
};

export type RegisterUserDto = {
  cellphone: Scalars['String']['input'];
  county?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  province: Scalars['String']['input'];
  role: UserRole;
  username: Scalars['String']['input'];
};

export type RegisterYearDto = {
  id?: InputMaybe<Scalars['Float']['input']>;
  isEnabled: Scalars['Boolean']['input'];
  term1: Scalars['Boolean']['input'];
  term2: Scalars['Boolean']['input'];
  term3: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

/** RegistrationReason of a student */
export enum RegistrationReason {
  FarzandanEmdadBegir = 'FarzandanEmdadBegir',
  FarzandanNegahdariShodeDarMarakez = 'FarzandanNegahdariShodeDarMarakez',
  MaloolinOzvKhanvar = 'MaloolinOzvKhanvar',
  MaloolinSarparast = 'MaloolinSarparast',
  Other = 'Other',
  ZananSarparastKhanevar = 'ZananSarparastKhanevar',
}

export type ReportStudentByFolderDto = {
  __typename?: 'ReportStudentByFolderDto';
  cnt?: Maybe<Scalars['String']['output']>;
  folder: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ReportStudentDto = {
  __typename?: 'ReportStudentDto';
  AzadEslami?: Maybe<Scalars['String']['output']>;
  DolatiShabane?: Maybe<Scalars['String']['output']>;
  DolatoRoozane?: Maybe<Scalars['String']['output']>;
  Elmi?: Maybe<Scalars['String']['output']>;
  GheiEntefaee?: Maybe<Scalars['String']['output']>;
  Hoze?: Maybe<Scalars['String']['output']>;
  Majazi?: Maybe<Scalars['String']['output']>;
  Moozeshkade?: Maybe<Scalars['String']['output']>;
  Pardis?: Maybe<Scalars['String']['output']>;
  PardisInt?: Maybe<Scalars['String']['output']>;
  Payamnoor?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type Student = {
  __typename?: 'Student';
  AddressLine1: Scalars['String']['output'];
  birthDate: Scalars['DateTime']['output'];
  cellphone: Scalars['String']['output'];
  creationDateTime: Scalars['DateTime']['output'];
  educations: Array<EducationDetail>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  liveLocation: SubDeviation;
  nid: Scalars['String']['output'];
  password: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type SubDeviation = {
  __typename?: 'SubDeviation';
  creationDateTime: Scalars['DateTime']['output'];
  deviation: Deviation;
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: SubDeviationType;
};

/** SubDeviationType of a subDeviation */
export enum SubDeviationType {
  City = 'City',
  Village = 'Village',
}

export type Term = {
  __typename?: 'Term';
  MadadkarAcceptance?: Maybe<Scalars['Boolean']['output']>;
  MadadkarAcceptanceDateTime?: Maybe<Scalars['DateTime']['output']>;
  MadadkarUser?: Maybe<User>;
  ModirAcceptance?: Maybe<Scalars['Boolean']['output']>;
  ModirAcceptanceDateTime?: Maybe<Scalars['DateTime']['output']>;
  ModirUser?: Maybe<User>;
  ProvinceAcceptance?: Maybe<Scalars['Boolean']['output']>;
  ProvinceAcceptanceDateTime?: Maybe<Scalars['DateTime']['output']>;
  ProvinceUser?: Maybe<User>;
  account?: Maybe<AccountDetail>;
  checkList?: Maybe<Scalars['String']['output']>;
  cost: Cost;
  creationDateTime: Scalars['DateTime']['output'];
  detail: EducationDetail;
  document: TermDocument;
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  locked?: Maybe<Scalars['Boolean']['output']>;
  semister: Scalars['Float']['output'];
  unit: Scalars['Float']['output'];
  year: Year;
};

export type TermDocument = {
  __typename?: 'TermDocument';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  pic1: FileContent;
  pic2: FileContent;
  pic3: FileContent;
  term: Term;
};

export type TermDto = {
  account?: InputMaybe<AccountDto>;
  cost: CostDto;
  detail: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  images: Array<Scalars['Upload']['input']>;
  imagesNumber: Array<Scalars['Float']['input']>;
  semister: Scalars['Float']['input'];
  unit: Scalars['Float']['input'];
  year: Scalars['String']['input'];
};

/** TermsStatus of a term */
export enum TermsStatus {
  Accepted = 'Accepted',
  All = 'All',
  Any = 'Any',
  Not = 'NOT',
  Notshahrestan = 'NOTSHAHRESTAN',
  Rejected = 'Rejected',
}

export type Transaction = {
  __typename?: 'Transaction';
  creationDateTime: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  getRecordCount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  isPayed: Scalars['Boolean']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  priority?: Maybe<TransactionPriority>;
  semister: Scalars['Float']['output'];
  threshold?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  userRegistrar: Scalars['String']['output'];
  year: Year;
};

/** TransactionPriority of a term calculcation */
export enum TransactionPriority {
  Priority1 = 'Priority1',
  Priority2 = 'Priority2',
}

export type UniversityDepartment = {
  __typename?: 'UniversityDepartment';
  county: County;
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: UniversityType;
};

export type UniversityDto = {
  County: Scalars['String']['input'];
  Group: Scalars['String']['input'];
  Level: Scalars['String']['input'];
  Province: Scalars['String']['input'];
  SubGroup: Scalars['String']['input'];
  Type: Scalars['String']['input'];
  UniversityAcceptanceDate: Scalars['String']['input'];
  department: Scalars['String']['input'];
  major: Scalars['String']['input'];
  studentNumber: Scalars['String']['input'];
};

/** Maghta */
export type UniversityLevel = {
  __typename?: 'UniversityLevel';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  subgroup: UniversityLevelSubGroup;
  title: Scalars['String']['output'];
};

/** Maghta Group */
export type UniversityLevelGroup = {
  __typename?: 'UniversityLevelGroup';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

/** Maghta Sub Group */
export type UniversityLevelSubGroup = {
  __typename?: 'UniversityLevelSubGroup';
  creationDateTime: Scalars['DateTime']['output'];
  group: UniversityLevelGroup;
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

/** Reshte */
export type UniversityMajor = {
  __typename?: 'UniversityMajor';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  level: UniversityLevel;
  title: Scalars['String']['output'];
};

export type UniversityType = {
  __typename?: 'UniversityType';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type UpdateMajorDto = {
  acceptanceDate: Scalars['String']['input'];
  departmentId: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  majorId: Scalars['Float']['input'];
  studentId?: InputMaybe<Scalars['Float']['input']>;
  studentNumber: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  cellphone: Scalars['String']['output'];
  county?: Maybe<County>;
  creationDateTime: Scalars['DateTime']['output'];
  deviation?: Maybe<Deviation>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEnabled: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  lastUpdateDateTime: Scalars['DateTime']['output'];
  password: Scalars['String']['output'];
  province?: Maybe<Province>;
  role: UserRole;
  subDeviation?: Maybe<SubDeviation>;
  token?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

/** UserRole of an user */
export enum UserRole {
  Administrator = 'Administrator',
  Madadkar = 'Madadkar',
  Moavenat = 'Moavenat',
  Modir = 'Modir',
  Province = 'Province',
  Shahrestan = 'Shahrestan',
}

export type Year = {
  __typename?: 'Year';
  creationDateTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isEnabled?: Maybe<Scalars['Boolean']['output']>;
  lastUpdateDateTime: Scalars['DateTime']['output'];
  term1?: Maybe<Scalars['Boolean']['output']>;
  term2?: Maybe<Scalars['Boolean']['output']>;
  term3?: Maybe<Scalars['Boolean']['output']>;
  title: Scalars['String']['output'];
};

export type SignUpMutationVariables = Exact<{
  dto: RegisterStudentDto;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  registerStudent: { __typename?: 'Student'; id: string };
};

export type SignInMutationVariables = Exact<{
  dto: LoginDto;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  Login: {
    __typename?: 'Student';
    id: string;
    firstName: string;
    lastName: string;
    token?: string | null;
  };
};

export type PasswordResetRequestMutationVariables = Exact<{
  nid: Scalars['String']['input'];
}>;

export type PasswordResetRequestMutation = {
  __typename?: 'Mutation';
  ForgotPassword: boolean;
};

export type ProvincesQueryVariables = Exact<{ [key: string]: never }>;

export type ProvincesQuery = {
  __typename?: 'Query';
  getProvinces: Array<{ __typename?: 'Province'; id: string; title: string }>;
};

export type CountiesByProvinceQueryVariables = Exact<{
  dto: GetCountiesDto;
}>;

export type CountiesByProvinceQuery = {
  __typename?: 'Query';
  getCounties: Array<{ __typename?: 'County'; id: string; title: string }>;
};

export type DistrictsByCountyQueryVariables = Exact<{
  dto: GetDeviationDto;
}>;

export type DistrictsByCountyQuery = {
  __typename?: 'Query';
  getDeviatins: Array<{ __typename?: 'Deviation'; id: string; title: string }>;
};

export type SubDistrictsByDistrictQueryVariables = Exact<{
  dto: GetSubDeviationDto;
}>;

export type SubDistrictsByDistrictQuery = {
  __typename?: 'Query';
  getSubDeviations: Array<{
    __typename?: 'SubDeviation';
    id: string;
    title: string;
    type: SubDeviationType;
  }>;
};

export type InquiryQueryVariables = Exact<{
  dto: GetEstelamDto;
  nid: Scalars['String']['input'];
}>;

export type InquiryQuery = {
  __typename?: 'Query';
  getEstelam: {
    __typename?: 'EstelamResult';
    name: string;
    family: string;
    fatherName: string;
  };
  getFolder: Array<{
    __typename?: 'FoldersResult';
    Rehab: number;
    Commision: number;
    Farzan: number;
    Emdad: number;
    CP: number;
    Zanan: number;
    ZananChild: number;
    RehabChild: number;
    ZananPoshtChild: number;
    ZananPosht: number;
    ZananTarkhis: number;
    ZananTarkhisChild: number;
    EmdadTakhis: number;
  }>;
};

export type GetEducationLevelsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEducationLevelsQuery = {
  __typename?: 'Query';
  getDetails: Array<{
    __typename?: 'EducationDetail';
    id: string;
    studentNumber: string;
    UniversityAcceptanceDate: any;
    student: {
      __typename?: 'Student';
      id: string;
      firstName: string;
      lastName: string;
      nid: string;
      birthDate: any;
    };
    major: {
      __typename?: 'UniversityMajor';
      title: string;
      level: { __typename?: 'UniversityLevel'; title: string };
    };
    department: {
      __typename?: 'UniversityDepartment';
      title: string;
      type: { __typename?: 'UniversityType'; id: string; title: string };
    };
  }>;
};

export type GetTermsByEducationLevelQueryVariables = Exact<{
  eid: Scalars['Float']['input'];
}>;

export type GetTermsByEducationLevelQuery = {
  __typename?: 'Query';
  getTerms: Array<{
    __typename?: 'Term';
    id: string;
    semister: number;
    unit: number;
    MadadkarAcceptance?: boolean | null;
    detail: {
      __typename?: 'EducationDetail';
      id: string;
      studentNumber: string;
      UniversityAcceptanceDate: any;
      student: {
        __typename?: 'Student';
        id: string;
        firstName: string;
        lastName: string;
        nid: string;
        birthDate: any;
      };
      major: {
        __typename?: 'UniversityMajor';
        title: string;
        level: { __typename?: 'UniversityLevel'; title: string };
      };
      department: {
        __typename?: 'UniversityDepartment';
        title: string;
        type: { __typename?: 'UniversityType'; id: string; title: string };
      };
    };
    year: { __typename?: 'Year'; id: string; title: string };
    cost: {
      __typename?: 'Cost';
      fixed: number;
      variable: number;
      total: number;
    };
    account?: {
      __typename?: 'AccountDetail';
      IBN: string;
      CARD: string;
      number: string;
    } | null;
  }>;
};

export type UniversityLevelGroupsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type UniversityLevelGroupsQuery = {
  __typename?: 'Query';
  getUniveristyLevelGroups: Array<{
    __typename?: 'UniversityLevelGroup';
    id: string;
    title: string;
  }>;
};

export type UniversityLevelSubGroupsQueryVariables = Exact<{
  dto: GetUniversitySubGroupDto;
}>;

export type UniversityLevelSubGroupsQuery = {
  __typename?: 'Query';
  getUniveristyLevelSubGroups: Array<{
    __typename?: 'UniversityLevelSubGroup';
    id: string;
    title: string;
  }>;
};

export type UniversityLevelsQueryVariables = Exact<{
  dto: GetUniversityLevelDto;
}>;

export type UniversityLevelsQuery = {
  __typename?: 'Query';
  getUniversityLevels: Array<{
    __typename?: 'UniversityLevel';
    id: string;
    title: string;
  }>;
};

export type UniversityMajorsQueryVariables = Exact<{
  dto: GetUniversityMajorsDto;
}>;

export type UniversityMajorsQuery = {
  __typename?: 'Query';
  getUniversityMajors: Array<{
    __typename?: 'UniversityMajor';
    id: string;
    title: string;
  }>;
};

export type UniversityTypesQueryVariables = Exact<{ [key: string]: never }>;

export type UniversityTypesQuery = {
  __typename?: 'Query';
  getUniversityTypes: Array<{
    __typename?: 'UniversityType';
    id: string;
    title: string;
  }>;
};

export type UniversityDepartmentsQueryVariables = Exact<{
  dto: GetUniversityDepartmentDto;
}>;

export type UniversityDepartmentsQuery = {
  __typename?: 'Query';
  getUniversityDepartments: Array<{
    __typename?: 'UniversityDepartment';
    id: string;
    title: string;
  }>;
};

export type AccountDetailKeySpecifier = (
  | 'CARD'
  | 'IBN'
  | 'Number'
  | AccountDetailKeySpecifier
)[];
export type AccountDetailFieldPolicy = {
  CARD?: FieldPolicy<any> | FieldReadFunction<any>;
  IBN?: FieldPolicy<any> | FieldReadFunction<any>;
  Number?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BasicItemKeySpecifier = ('id' | 'title' | BasicItemKeySpecifier)[];
export type BasicItemFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CostKeySpecifier = (
  | 'fixed'
  | 'total'
  | 'variable'
  | CostKeySpecifier
)[];
export type CostFieldPolicy = {
  fixed?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  variable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CountyKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'province'
  | 'title'
  | CountyKeySpecifier
)[];
export type CountyFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  province?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeviationKeySpecifier = (
  | 'county'
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | DeviationKeySpecifier
)[];
export type DeviationFieldPolicy = {
  county?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EducationDetailKeySpecifier = (
  | 'UniversityAcceptanceDate'
  | 'creationDateTime'
  | 'department'
  | 'id'
  | 'lastUpdateDateTime'
  | 'major'
  | 'student'
  | 'studentNumber'
  | 'terms'
  | EducationDetailKeySpecifier
)[];
export type EducationDetailFieldPolicy = {
  UniversityAcceptanceDate?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  department?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  major?: FieldPolicy<any> | FieldReadFunction<any>;
  student?: FieldPolicy<any> | FieldReadFunction<any>;
  studentNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  terms?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EstelamResultKeySpecifier = (
  | 'family'
  | 'fatherName'
  | 'name'
  | EstelamResultKeySpecifier
)[];
export type EstelamResultFieldPolicy = {
  family?: FieldPolicy<any> | FieldReadFunction<any>;
  fatherName?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FileContentKeySpecifier = (
  | 'content'
  | 'encoding'
  | 'mimetype'
  | 'name'
  | FileContentKeySpecifier
)[];
export type FileContentFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  encoding?: FieldPolicy<any> | FieldReadFunction<any>;
  mimetype?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FoldersResultKeySpecifier = (
  | 'CP'
  | 'Commision'
  | 'Emdad'
  | 'EmdadTakhis'
  | 'Farzan'
  | 'Rehab'
  | 'RehabChild'
  | 'Zanan'
  | 'ZananChild'
  | 'ZananPosht'
  | 'ZananPoshtChild'
  | 'ZananTarkhis'
  | 'ZananTarkhisChild'
  | FoldersResultKeySpecifier
)[];
export type FoldersResultFieldPolicy = {
  CP?: FieldPolicy<any> | FieldReadFunction<any>;
  Commision?: FieldPolicy<any> | FieldReadFunction<any>;
  Emdad?: FieldPolicy<any> | FieldReadFunction<any>;
  EmdadTakhis?: FieldPolicy<any> | FieldReadFunction<any>;
  Farzan?: FieldPolicy<any> | FieldReadFunction<any>;
  Rehab?: FieldPolicy<any> | FieldReadFunction<any>;
  RehabChild?: FieldPolicy<any> | FieldReadFunction<any>;
  Zanan?: FieldPolicy<any> | FieldReadFunction<any>;
  ZananChild?: FieldPolicy<any> | FieldReadFunction<any>;
  ZananPosht?: FieldPolicy<any> | FieldReadFunction<any>;
  ZananPoshtChild?: FieldPolicy<any> | FieldReadFunction<any>;
  ZananTarkhis?: FieldPolicy<any> | FieldReadFunction<any>;
  ZananTarkhisChild?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'AcceptTransaction'
  | 'Authenticate'
  | 'CalculateTransaction'
  | 'ChangeCity'
  | 'DeleteTransaction'
  | 'ForgotPassword'
  | 'Login'
  | 'RegisterDepartment'
  | 'RegisterGroup'
  | 'RegisterLevel'
  | 'RegisterReshte'
  | 'RegisterSubGroup'
  | 'RegisterTerm'
  | 'RegisterTransaction'
  | 'RegisterYear'
  | 'UpdateMajor'
  | 'accept'
  | 'acceptModir'
  | 'chaneCellphone'
  | 'checkList'
  | 'deleteTerm'
  | 'registerStudent'
  | 'registerUser'
  | 'removeAdminTerm'
  | 'removeShahrestan'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  AcceptTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  Authenticate?: FieldPolicy<any> | FieldReadFunction<any>;
  CalculateTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  ChangeCity?: FieldPolicy<any> | FieldReadFunction<any>;
  DeleteTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  ForgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  Login?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterDepartment?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterReshte?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterSubGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterTransaction?: FieldPolicy<any> | FieldReadFunction<any>;
  RegisterYear?: FieldPolicy<any> | FieldReadFunction<any>;
  UpdateMajor?: FieldPolicy<any> | FieldReadFunction<any>;
  accept?: FieldPolicy<any> | FieldReadFunction<any>;
  acceptModir?: FieldPolicy<any> | FieldReadFunction<any>;
  chaneCellphone?: FieldPolicy<any> | FieldReadFunction<any>;
  checkList?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  registerStudent?: FieldPolicy<any> | FieldReadFunction<any>;
  registerUser?: FieldPolicy<any> | FieldReadFunction<any>;
  removeAdminTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  removeShahrestan?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProvinceKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | ProvinceKeySpecifier
)[];
export type ProvinceFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'Version'
  | 'getCounties'
  | 'getDetails'
  | 'getDeviatins'
  | 'getEstelam'
  | 'getFolder'
  | 'getProvinces'
  | 'getRegistrationReason'
  | 'getReport'
  | 'getReportByFolder'
  | 'getStudents'
  | 'getSubDeviations'
  | 'getTerms'
  | 'getTermsList'
  | 'getTransactions'
  | 'getUniveristyLevelGroups'
  | 'getUniveristyLevelSubGroups'
  | 'getUniversityDepartments'
  | 'getUniversityLevels'
  | 'getUniversityMajors'
  | 'getUniversityTypes'
  | 'getUsers'
  | 'getYears'
  | 'searchMajor'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  Version?: FieldPolicy<any> | FieldReadFunction<any>;
  getCounties?: FieldPolicy<any> | FieldReadFunction<any>;
  getDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  getDeviatins?: FieldPolicy<any> | FieldReadFunction<any>;
  getEstelam?: FieldPolicy<any> | FieldReadFunction<any>;
  getFolder?: FieldPolicy<any> | FieldReadFunction<any>;
  getProvinces?: FieldPolicy<any> | FieldReadFunction<any>;
  getRegistrationReason?: FieldPolicy<any> | FieldReadFunction<any>;
  getReport?: FieldPolicy<any> | FieldReadFunction<any>;
  getReportByFolder?: FieldPolicy<any> | FieldReadFunction<any>;
  getStudents?: FieldPolicy<any> | FieldReadFunction<any>;
  getSubDeviations?: FieldPolicy<any> | FieldReadFunction<any>;
  getTerms?: FieldPolicy<any> | FieldReadFunction<any>;
  getTermsList?: FieldPolicy<any> | FieldReadFunction<any>;
  getTransactions?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniveristyLevelGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniveristyLevelSubGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniversityDepartments?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniversityLevels?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniversityMajors?: FieldPolicy<any> | FieldReadFunction<any>;
  getUniversityTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  getUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  getYears?: FieldPolicy<any> | FieldReadFunction<any>;
  searchMajor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReportStudentByFolderDtoKeySpecifier = (
  | 'cnt'
  | 'folder'
  | 'title'
  | ReportStudentByFolderDtoKeySpecifier
)[];
export type ReportStudentByFolderDtoFieldPolicy = {
  cnt?: FieldPolicy<any> | FieldReadFunction<any>;
  folder?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReportStudentDtoKeySpecifier = (
  | 'AzadEslami'
  | 'DolatiShabane'
  | 'DolatoRoozane'
  | 'Elmi'
  | 'GheiEntefaee'
  | 'Hoze'
  | 'Majazi'
  | 'Moozeshkade'
  | 'Pardis'
  | 'PardisInt'
  | 'Payamnoor'
  | 'title'
  | ReportStudentDtoKeySpecifier
)[];
export type ReportStudentDtoFieldPolicy = {
  AzadEslami?: FieldPolicy<any> | FieldReadFunction<any>;
  DolatiShabane?: FieldPolicy<any> | FieldReadFunction<any>;
  DolatoRoozane?: FieldPolicy<any> | FieldReadFunction<any>;
  Elmi?: FieldPolicy<any> | FieldReadFunction<any>;
  GheiEntefaee?: FieldPolicy<any> | FieldReadFunction<any>;
  Hoze?: FieldPolicy<any> | FieldReadFunction<any>;
  Majazi?: FieldPolicy<any> | FieldReadFunction<any>;
  Moozeshkade?: FieldPolicy<any> | FieldReadFunction<any>;
  Pardis?: FieldPolicy<any> | FieldReadFunction<any>;
  PardisInt?: FieldPolicy<any> | FieldReadFunction<any>;
  Payamnoor?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StudentKeySpecifier = (
  | 'AddressLine1'
  | 'birthDate'
  | 'cellphone'
  | 'creationDateTime'
  | 'educations'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'lastUpdateDateTime'
  | 'liveLocation'
  | 'nid'
  | 'password'
  | 'token'
  | 'username'
  | StudentKeySpecifier
)[];
export type StudentFieldPolicy = {
  AddressLine1?: FieldPolicy<any> | FieldReadFunction<any>;
  birthDate?: FieldPolicy<any> | FieldReadFunction<any>;
  cellphone?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  educations?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  liveLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  nid?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubDeviationKeySpecifier = (
  | 'creationDateTime'
  | 'deviation'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | 'type'
  | SubDeviationKeySpecifier
)[];
export type SubDeviationFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  deviation?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TermKeySpecifier = (
  | 'MadadkarAcceptance'
  | 'MadadkarAcceptanceDateTime'
  | 'MadadkarUser'
  | 'ModirAcceptance'
  | 'ModirAcceptanceDateTime'
  | 'ModirUser'
  | 'ProvinceAcceptance'
  | 'ProvinceAcceptanceDateTime'
  | 'ProvinceUser'
  | 'account'
  | 'checkList'
  | 'cost'
  | 'creationDateTime'
  | 'detail'
  | 'document'
  | 'id'
  | 'lastUpdateDateTime'
  | 'locked'
  | 'semister'
  | 'unit'
  | 'year'
  | TermKeySpecifier
)[];
export type TermFieldPolicy = {
  MadadkarAcceptance?: FieldPolicy<any> | FieldReadFunction<any>;
  MadadkarAcceptanceDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  MadadkarUser?: FieldPolicy<any> | FieldReadFunction<any>;
  ModirAcceptance?: FieldPolicy<any> | FieldReadFunction<any>;
  ModirAcceptanceDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  ModirUser?: FieldPolicy<any> | FieldReadFunction<any>;
  ProvinceAcceptance?: FieldPolicy<any> | FieldReadFunction<any>;
  ProvinceAcceptanceDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  ProvinceUser?: FieldPolicy<any> | FieldReadFunction<any>;
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  checkList?: FieldPolicy<any> | FieldReadFunction<any>;
  cost?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  detail?: FieldPolicy<any> | FieldReadFunction<any>;
  document?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  locked?: FieldPolicy<any> | FieldReadFunction<any>;
  semister?: FieldPolicy<any> | FieldReadFunction<any>;
  unit?: FieldPolicy<any> | FieldReadFunction<any>;
  year?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TermDocumentKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'pic1'
  | 'pic2'
  | 'pic3'
  | 'term'
  | TermDocumentKeySpecifier
)[];
export type TermDocumentFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  pic1?: FieldPolicy<any> | FieldReadFunction<any>;
  pic2?: FieldPolicy<any> | FieldReadFunction<any>;
  pic3?: FieldPolicy<any> | FieldReadFunction<any>;
  term?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TransactionKeySpecifier = (
  | 'creationDateTime'
  | 'description'
  | 'getRecordCount'
  | 'id'
  | 'isEnabled'
  | 'isPayed'
  | 'lastUpdateDateTime'
  | 'priority'
  | 'semister'
  | 'threshold'
  | 'title'
  | 'userRegistrar'
  | 'year'
  | TransactionKeySpecifier
)[];
export type TransactionFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  getRecordCount?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  isPayed?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  priority?: FieldPolicy<any> | FieldReadFunction<any>;
  semister?: FieldPolicy<any> | FieldReadFunction<any>;
  threshold?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  userRegistrar?: FieldPolicy<any> | FieldReadFunction<any>;
  year?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityDepartmentKeySpecifier = (
  | 'county'
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | 'type'
  | UniversityDepartmentKeySpecifier
)[];
export type UniversityDepartmentFieldPolicy = {
  county?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityLevelKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'subgroup'
  | 'title'
  | UniversityLevelKeySpecifier
)[];
export type UniversityLevelFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  subgroup?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityLevelGroupKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | UniversityLevelGroupKeySpecifier
)[];
export type UniversityLevelGroupFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityLevelSubGroupKeySpecifier = (
  | 'creationDateTime'
  | 'group'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | UniversityLevelSubGroupKeySpecifier
)[];
export type UniversityLevelSubGroupFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityMajorKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'level'
  | 'title'
  | UniversityMajorKeySpecifier
)[];
export type UniversityMajorFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UniversityTypeKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'lastUpdateDateTime'
  | 'title'
  | UniversityTypeKeySpecifier
)[];
export type UniversityTypeFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | 'cellphone'
  | 'county'
  | 'creationDateTime'
  | 'deviation'
  | 'email'
  | 'firstName'
  | 'id'
  | 'isEnabled'
  | 'lastName'
  | 'lastUpdateDateTime'
  | 'password'
  | 'province'
  | 'role'
  | 'subDeviation'
  | 'token'
  | 'userId'
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  cellphone?: FieldPolicy<any> | FieldReadFunction<any>;
  county?: FieldPolicy<any> | FieldReadFunction<any>;
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  deviation?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  province?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  subDeviation?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type YearKeySpecifier = (
  | 'creationDateTime'
  | 'id'
  | 'isEnabled'
  | 'lastUpdateDateTime'
  | 'term1'
  | 'term2'
  | 'term3'
  | 'title'
  | YearKeySpecifier
)[];
export type YearFieldPolicy = {
  creationDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdateDateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  term1?: FieldPolicy<any> | FieldReadFunction<any>;
  term2?: FieldPolicy<any> | FieldReadFunction<any>;
  term3?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  AccountDetail?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AccountDetailKeySpecifier
      | (() => undefined | AccountDetailKeySpecifier);
    fields?: AccountDetailFieldPolicy;
  };
  BasicItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BasicItemKeySpecifier
      | (() => undefined | BasicItemKeySpecifier);
    fields?: BasicItemFieldPolicy;
  };
  Cost?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | CostKeySpecifier | (() => undefined | CostKeySpecifier);
    fields?: CostFieldPolicy;
  };
  County?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CountyKeySpecifier
      | (() => undefined | CountyKeySpecifier);
    fields?: CountyFieldPolicy;
  };
  Deviation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeviationKeySpecifier
      | (() => undefined | DeviationKeySpecifier);
    fields?: DeviationFieldPolicy;
  };
  EducationDetail?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EducationDetailKeySpecifier
      | (() => undefined | EducationDetailKeySpecifier);
    fields?: EducationDetailFieldPolicy;
  };
  EstelamResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EstelamResultKeySpecifier
      | (() => undefined | EstelamResultKeySpecifier);
    fields?: EstelamResultFieldPolicy;
  };
  FileContent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FileContentKeySpecifier
      | (() => undefined | FileContentKeySpecifier);
    fields?: FileContentFieldPolicy;
  };
  FoldersResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FoldersResultKeySpecifier
      | (() => undefined | FoldersResultKeySpecifier);
    fields?: FoldersResultFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Province?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProvinceKeySpecifier
      | (() => undefined | ProvinceKeySpecifier);
    fields?: ProvinceFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  ReportStudentByFolderDto?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReportStudentByFolderDtoKeySpecifier
      | (() => undefined | ReportStudentByFolderDtoKeySpecifier);
    fields?: ReportStudentByFolderDtoFieldPolicy;
  };
  ReportStudentDto?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReportStudentDtoKeySpecifier
      | (() => undefined | ReportStudentDtoKeySpecifier);
    fields?: ReportStudentDtoFieldPolicy;
  };
  Student?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | StudentKeySpecifier
      | (() => undefined | StudentKeySpecifier);
    fields?: StudentFieldPolicy;
  };
  SubDeviation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SubDeviationKeySpecifier
      | (() => undefined | SubDeviationKeySpecifier);
    fields?: SubDeviationFieldPolicy;
  };
  Term?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TermKeySpecifier | (() => undefined | TermKeySpecifier);
    fields?: TermFieldPolicy;
  };
  TermDocument?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TermDocumentKeySpecifier
      | (() => undefined | TermDocumentKeySpecifier);
    fields?: TermDocumentFieldPolicy;
  };
  Transaction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TransactionKeySpecifier
      | (() => undefined | TransactionKeySpecifier);
    fields?: TransactionFieldPolicy;
  };
  UniversityDepartment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityDepartmentKeySpecifier
      | (() => undefined | UniversityDepartmentKeySpecifier);
    fields?: UniversityDepartmentFieldPolicy;
  };
  UniversityLevel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityLevelKeySpecifier
      | (() => undefined | UniversityLevelKeySpecifier);
    fields?: UniversityLevelFieldPolicy;
  };
  UniversityLevelGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityLevelGroupKeySpecifier
      | (() => undefined | UniversityLevelGroupKeySpecifier);
    fields?: UniversityLevelGroupFieldPolicy;
  };
  UniversityLevelSubGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityLevelSubGroupKeySpecifier
      | (() => undefined | UniversityLevelSubGroupKeySpecifier);
    fields?: UniversityLevelSubGroupFieldPolicy;
  };
  UniversityMajor?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityMajorKeySpecifier
      | (() => undefined | UniversityMajorKeySpecifier);
    fields?: UniversityMajorFieldPolicy;
  };
  UniversityType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UniversityTypeKeySpecifier
      | (() => undefined | UniversityTypeKeySpecifier);
    fields?: UniversityTypeFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  Year?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | YearKeySpecifier | (() => undefined | YearKeySpecifier);
    fields?: YearFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
