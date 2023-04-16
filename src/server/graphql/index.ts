import { GraphQLClient } from 'graphql-request';
import resolvers from './resolvers';
import typedefs from './typedefs';

export const graphqlClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_HOST}/api/graphql`,
  {
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  },
);

export default {
  resolvers,
  typeDefs: typedefs,
};
