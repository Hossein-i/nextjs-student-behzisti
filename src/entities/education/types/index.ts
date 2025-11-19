import type { EducationLevelsQueryReturn } from '@/shared/api/graphql';

export type EducationLevel = NonNullable<EducationLevelsQueryReturn>[number];
