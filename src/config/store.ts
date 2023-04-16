import { Options } from '@faststore/api';

function generateConfig() {
  const reactQuery = {
    refetchInterval: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    cacheTime: 1 * 60 * 60 * 24 * 1000,
    staleTime: 1 * 60 * 60 * 24 * 1000,
  };

  const base = {
    platform: 'vtex',

    storeName: 'Open store',

    useLocalLogin: false,
    useLocalCheckout: false,
    useLocalMyAccount: false,

    externalUrls: {
      storeUrl: 'https://vtexfaststore.com',
      secureSubdomain: 'https://secure.vtexfaststore.com',
      checkoutUrl: 'https://secure.vtexfaststore.com/checkout',
      loginUrl: 'https://secure.vtexfaststore.com/api/io/login',
      accountUrl: 'https://secure.vtexfaststore.com/api/io/account',
    },

    api: {
      storeId: 'storeframework',
      workspace: 'master',
      environment: 'vtexcommercestable',
      hideUnavailableItems: true,
    },

    session: {
      currency: {
        code: 'USD',
        symbol: '$',
      },
      locale: 'en-US',
      channel: '{"salesChannel":"1","regionId":""}',
      country: 'USA',
      postalCode: null,
      person: null,
    },
  };

  const apiOptions: Options = {
    account: base.api.storeId,
    channel: base.session.channel,
    environment: base.api.environment as Options['environment'],
    hideUnavailableItems: base.api.hideUnavailableItems,
    locale: base.session.locale,
    platform: base.platform as Options['platform'],
    flags: {
      enableOrderFormSync: true,
    },
  };

  return {
    base,
    apiOptions,
    reactQuery,
  };
}

export const config = generateConfig();
