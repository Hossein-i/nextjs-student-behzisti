import type {
  EducationLevelsQueryReturn,
  TermsByEducationLevelQueryReturn,
} from '@/shared/api/graphql';

export type EducationLevel = NonNullable<EducationLevelsQueryReturn>[0];

export type TermByEducationLevel =
  NonNullable<TermsByEducationLevelQueryReturn>[0];
