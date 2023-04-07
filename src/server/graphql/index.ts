import { GraphQLClient } from 'graphql-request';
import resolvers from './resolvers';
import typedefs from './typedefs';

export const graphqlClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_HOST}/api/graphql`,
);

export default {
  resolvers,
  typeDefs: typedefs,
};
