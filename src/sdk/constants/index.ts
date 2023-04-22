export const isServer = typeof window === 'undefined';

export const SEARCH_STORE_KEY = 'fs::terms::history';
export const CART_STORE_KEY = 'fs::cart';
export const SESSION_STORE_KEY = 'fs::session';

export const POSTAL_CODE_REGEX: Record<
  string,
  { pattern: RegExp; formatter: string }
> = {
  'en-US': {
    pattern: /^[0-9]{5}(?:-[0-9]{4})?$/gi,
    formatter: '99999-9999',
  },
};
