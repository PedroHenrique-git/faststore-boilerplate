import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12
const theme = require('../src/styles/theme');

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/',
    asPath: '/',
    query: {},
    push() {},
  },
  chakra: {
    theme,
  },
};
