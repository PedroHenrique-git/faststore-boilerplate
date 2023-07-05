import { config } from '@config/store';
import { IStoreSession } from '@generated/graphql';
import { Address, User } from '@services/safedata/types';
import IndexedDBService from '@services/storage/indexeddb';
import { atom } from 'jotai';
import { Order, OrderDetail } from 'src/services/orders/types';
import { Cart } from '../cart';
import { CART_STORE_KEY, SESSION_STORE_KEY } from '../constants';

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

export const cartAtom = atomWithAsyncStorage<Cart>(CART_STORE_KEY, {
  id: '',
  messages: [],
  items: [],
});

export const sessionAtom = atomWithAsyncStorage<IStoreSession>(
  SESSION_STORE_KEY,
  config.base.session,
);

export const cartSidebarAtom = atom(false);
export const filterSideBarAtom = atom(false);

export const paginationAtom = atom({
  totalProducts: 0,
  hasNextPage: false,
  hasPrevPage: false,
  totalPages: 0,
});

export const userData = atom<{
  user: User;
  selectedAddress: Address | null;
  selectedOrder: OrderDetail | null;
  orders: Order[];
  addresses: Address[];
}>({
  user: {
    id: null,
    userId: null,
    email: null,
    document: null,
    firstName: null,
    lastName: null,
    phone: null,
    birthDate: null,
  },
  selectedAddress: null,
  selectedOrder: null,
  addresses: [],
  orders: [],
});
