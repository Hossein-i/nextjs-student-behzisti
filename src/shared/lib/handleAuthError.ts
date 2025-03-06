import { ApolloError } from '@apollo/client';

export const handleAuthError =
  <T>(
    promise: () => Promise<T>,
    action?: () => void
  ): (() => Promise<T | null>) =>
  () =>
    promise()
      .then((value) => value)
      .catch((reason) => {
        if (reason instanceof ApolloError) {
          const { networkError } = reason;
          const isResult = networkError && 'result' in networkError;

          if (isResult) {
            const { result } = networkError as {
              result: { errors?: Array<{ message?: string }> };
            };
            const isErrors = typeof result === 'object' && 'errors' in result;

            if (isErrors) {
              const { errors } = result;
              const error = errors?.[0];

              if (error) {
                const isMessage = 'message' in error;

                if (isMessage) {
                  const { message } = error;
                  if (
                    message === "Cannot read property 'id' of undefined" ||
                    message === 'Unauthorized' ||
                    message === 'Token expired'
                  ) {
                    action?.();
                    console.log('[handleAuthError]: ', 'Unauthorized');
                    return null;
                  }
                }
              }
            }
          }
        }

        throw reason;
      });
