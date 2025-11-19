import type { GetEducationLevelsQuery } from '@/shared/api/graphql';

export type EducationLevel = GetEducationLevelsQuery['getDetails'][number];
