import { GraphQLClient } from 'graphql-request';
import resolvers from './resolvers';
import typedefs from './typedefs';

export const graphqlClient = new GraphQLClient(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/graphql'
    : '',
);

export default {
  resolvers,
  typeDefs: typedefs,
};
