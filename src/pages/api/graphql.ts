import { apiOptions } from '@config/store';
import { getContextFactory } from '@faststore/api';
import { createSchema, createYoga } from 'graphql-yoga';
import resolvers from 'src/server/graphql/resolvers';
import typedefs from 'src/server/graphql/typedefs';

const schema = createSchema({
  resolvers,
  typeDefs: typedefs,
});

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: getContextFactory(apiOptions),
});
