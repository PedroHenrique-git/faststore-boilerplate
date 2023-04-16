/* eslint-disable react-hooks/rules-of-hooks */

import { config } from '@config/store';
import { getContextFactory } from '@faststore/api';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { createSchema, createYoga, useExtendContext } from 'graphql-yoga';
import graphqlSchema from 'src/server/graphql';

const schema = createSchema(graphqlSchema);
const apiContextFactory = getContextFactory(config.apiOptions);

export default createYoga<{ headers: Record<string, string> }>({
  schema,
  graphqlEndpoint: '/api/graphql',
  graphiql: process.env.NODE_ENV === 'development',
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [useDisableIntrospection()]
      : []),
    useExtendContext(apiContextFactory),
  ],
  context: (context) => {
    const headers: Record<string, string> = {};
    const entries = Array.from(context.request.headers.entries());

    for (const [key, value] of entries) {
      headers[key] = value;
    }

    return { headers };
  },
  validationCache: true,
  parserCache: true,
});
