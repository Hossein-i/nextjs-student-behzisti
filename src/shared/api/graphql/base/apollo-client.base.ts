import { getSession } from '@/features/auth/api';
import { config } from '@/shared/config';
import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import type { RetryFunctionOptions } from '@apollo/client/link/retry/retryFunction';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      const { message, locations, path } = error;

      console.error(
        `[GraphQL error]: msg:  ${message}, loc: ${locations}, path: ${path}`
      );
    }
  }

  if (networkError) {
    const { name, message, stack } = networkError;
    console.error(
      `[Network error]: name: ${name}, msg: ${message}, stack: ${stack}`
    );
  }
});

const customRetryIf: RetryFunctionOptions['retryIf'] = (error) => {
  if (!(error instanceof ApolloError)) {
    return false;
  }

  const { graphQLErrors, networkError } = error;

  if (networkError) {
    return true;
  }

  if (graphQLErrors) {
    return !graphQLErrors.some((err) => {
      return (
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.extensions?.code === 'FORBIDDEN' ||
        err.message === "Cannot read property 'id' of undefined"
      );
    });
  }

  return false;
};

const retryLink = new RetryLink({
  attempts: {
    max: 3,
    retryIf: customRetryIf,
  },
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session.user?.token;

  return {
    headers: {
      ...headers,
      // Authorization: token ? `Bearer ${token}` : undefined,
      token: token ? token : undefined,
    },
  };
});

const httpLink = new HttpLink({
  uri: config.GQL_URL,
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
