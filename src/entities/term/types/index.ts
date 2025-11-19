import type { GetTermsByEducationLevelQuery } from '@/shared/api/graphql';

export type TermByEducationLevel =
  GetTermsByEducationLevelQuery['getTerms'][number];
