import { Options } from '@faststore/api';

function generateConfig() {
  const base = {
    platform: 'vtex',

    storeName: 'Open store',

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
  };
}

export const config = generateConfig();
