import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { GraphQLClient } from 'graphql-request';
import { RootState } from '../state/store';

export const client = new GraphQLClient('http://192.168.1.90:4000/graphql');

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    client,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      // TODO does not work because of the auth middleware is not verifying the token properly
      if (token) {
        headers.set('authorization', `${token}`)
      }
      // 

      return headers
    }
  }),
  endpoints: (build) => ({}),
});

export const { } = api;
