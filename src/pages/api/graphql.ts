/* eslint-disable react-hooks/rules-of-hooks */

import { config } from '@config/store';
import { getContextFactory } from '@faststore/api';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { createSchema, createYoga } from 'graphql-yoga';
import graphqlSchema from 'src/server/graphql';

const schema = createSchema(graphqlSchema);

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: getContextFactory(config.apiOptions),
  graphiql: process.env.NODE_ENV === 'development',
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [useDisableIntrospection()]
      : []),
  ],
});
