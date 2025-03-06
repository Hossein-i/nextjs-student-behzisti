import type { UserSession } from '@/features/auth/types';

export type User = Omit<NonNullable<UserSession['user']>, 'token'>;
