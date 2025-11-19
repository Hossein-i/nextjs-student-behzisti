import type { TermsByEducationLevelQueryReturn } from '@/shared/api/graphql';

export type TermByEducationLevel =
  NonNullable<TermsByEducationLevelQueryReturn>[number];
