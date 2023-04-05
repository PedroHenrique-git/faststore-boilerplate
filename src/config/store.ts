import { Options } from '@faststore/api';

export const storeConfig = {
  platform: 'vtex',

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

export const apiOptions: Options = {
  account: storeConfig.api.storeId,
  channel: storeConfig.session.channel,
  environment: storeConfig.api.environment as Options['environment'],
  hideUnavailableItems: storeConfig.api.hideUnavailableItems,
  locale: storeConfig.session.locale,
  platform: storeConfig.platform as Options['platform'],
  flags: {
    enableOrderFormSync: true,
  },
};
