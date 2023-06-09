import { StorageService } from '@services/storage/indexeddb';
import Queue from 'promise-queue';
import { isServer } from '../constants';

class Store {
  private queue = new Queue(1, Infinity);

  async createStore<T>(
    key: string,
    initialValue: T,
    onInit?: (_indexeddb: StorageService) => Promise<void>,
  ) {
    if (isServer) {
      return {};
    }

    const { default: indexeddb } = await import('@services/storage/indexeddb');
    const created = await indexeddb.get(key);

    if (!created) {
      await indexeddb.set(key, initialValue);
    }

    if (onInit) {
      this.queue.add(() => onInit(indexeddb));
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
}

export default new Store();
