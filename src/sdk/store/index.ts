import { isServer } from '../constants';

export async function createStore<T>(key: string, initialValue: T) {
  if (isServer) {
    return {};
  }

  const { default: indexeddb } = await import('@services/storage/indexeddb');
  const created = await indexeddb.get(key);

  if (!created) {
    await indexeddb.set(key, initialValue);
  }

  return {
    async set<T>(data: T) {
      return indexeddb.set(key, data);
    },
    async clear() {
      return indexeddb.remove(key);
    },
    async get<T>(): Promise<T | null> {
      return indexeddb.get(key);
    },
  };
}
