import { config } from '@config/store';

export const isServer = typeof window === 'undefined';

export const API_ENDPOINT = `https://${config.base.api.storeId}.${config.base.api.environment}.com.br`;
export const ONE_DAY = Date.now() + 1 * 24 * 60 * 60 * 1000;
export const MAX_PAGES_TO_SHOW = 5;
export const DEFAULT_PER_PAGE = 12;
export const SEARCH_STORE_KEY = 'fs::terms::history';
export const CART_STORE_KEY = 'fs::cart';
export const SESSION_STORE_KEY = 'fs::session';

export const ENTITIES_WHITE_LIST: Record<string, string[]> = {
  AD: ['POST'],
};

export const POSTAL_CODE_REGEX: Record<
  string,
  { pattern: RegExp; formatter: string }
> = {
  'en-US': {
    pattern: /^[0-9]{5}(?:-[0-9]{4})?$/gi,
    formatter: '99999-9999',
  },
};
