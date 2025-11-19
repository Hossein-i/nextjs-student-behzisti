import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  ServerError,
} from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { signOut } from 'next-auth/react';

const shouldLogout = (message: string | undefined) => {
  if (!message) return false;

  return message.includes("Cannot read property 'id' of undefined");
};

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
      );

      if (shouldLogout(err.message)) {
        signOut({ redirectTo: '/' });
      }
    });
    return;
  }

  if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach((err) => {
      console.error(
        `[Protocol error]: Message: ${err.message}, Extensions: ${JSON.stringify(err.extensions)}`
      );

      if (shouldLogout(err.message)) {
        signOut({ redirectTo: '/' });
      }
    });
    return;
  }

  console.error(`[Network error]: ${error}`);

  if (ServerError.is(error)) {
    let serverMessage: string | undefined;

    try {
      const parsed = JSON.parse(error.bodyText);
      serverMessage = parsed?.errors?.[0]?.message;

      if (serverMessage) error.message = serverMessage;
    } catch (e) {
      console.error('Failed to parse server error:', e);
    }

    if (shouldLogout(serverMessage)) {
      signOut({ redirectTo: '/' });
    }
  }
});

const retryLink = new RetryLink();

const uploadHttpLink = new UploadHttpLink({
  uri: '/api/graphql',
  useGETForQueries: false,
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, uploadHttpLink]),
  cache: new InMemoryCache(),
});
