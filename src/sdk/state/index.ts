import { config } from '@config/store';
import { IStoreSession } from '@generated/graphql';
import IndexedDBService from '@services/storage/indexeddb';
import { atom } from 'jotai';
import { Cart } from '../cart';

const CART_KEY = 'fs::cart';
const SESSION_KEY = 'fs::session';

const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const baseAtom = atom<T>(initialValue);

  baseAtom.onMount = (setValue) => {
    (async () => {
      const item = await IndexedDBService.get<T>(key);

      if (item) {
        setValue(item);
      }
    })();
  };

  return baseAtom;
};

export const cartSidebarAtom = atom(false);

export const cartAtom = atomWithAsyncStorage<Cart>(CART_KEY, {
  id: '',
  messages: [],
  items: [],
});

export const sessionAtom = atomWithAsyncStorage<IStoreSession>(
  SESSION_KEY,
  config.base.session,
);
