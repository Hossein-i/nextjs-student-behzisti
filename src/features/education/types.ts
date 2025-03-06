import type {
  EducationLevelsQueryReturn,
  TermsByEducationLevelQueryReturn,
} from '@/shared/api/graphql';

export type EducationLevel = NonNullable<
  Awaited<EducationLevelsQueryReturn>
>[0];

export type TermByEducationLevel = NonNullable<
  Awaited<TermsByEducationLevelQueryReturn>
>[0];
