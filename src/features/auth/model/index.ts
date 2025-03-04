// types
export type {
  AuthenticateProps,
  AuthenticateReturn,
  RequestPasswordResetProps,
  RequestPasswordResetReturn,
} from './auth.model';

// model
export {
  authenticate,
  passwordResetRequest as requestPasswordReset,
} from './auth.model';
