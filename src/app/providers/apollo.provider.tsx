'use client';

import { ApolloProvider as Provider } from '@apollo/client/react';
import React from 'react';

import { apolloClient } from '@/shared/api/graphql';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ApolloProviderProps extends React.PropsWithChildren {}

export const ApolloProvider: React.FC<ApolloProviderProps> = (props) => {
  const { children } = props;

  return <Provider client={apolloClient}>{children}</Provider>;
};
