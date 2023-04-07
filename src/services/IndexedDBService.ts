import localforage from 'localforage';

export class IndexedDBService {
  private _storage: LocalForage = localforage;

  constructor() {
    this.setConfig();
  }

  private setConfig() {
    this._storage.config({
      driver: localforage.INDEXEDDB,
      name: 'STORE_DB',
    });
  }

  async set<T = unknown>(key: string, data: T): Promise<T | null> {
    try {
      return await this._storage.setItem(key, data);
    } catch (_) {
      return null;
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      return this._storage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  async remove<T = unknown>(key: string): Promise<T | null> {
    try {
      return this._storage.getItem(key);
    } catch (_) {
      return null;
    }
  }
}
