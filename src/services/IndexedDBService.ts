import localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';

localforage.defineDriver(memoryDriver);

export class IndexedDBService {
  private _storage: LocalForage = localforage;

  constructor() {
    this.setConfig();
  }

  private setConfig() {
    if (typeof window === undefined) {
      return;
    }

    this._storage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        localforage.WEBSQL,
        memoryDriver._driver,
      ],
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
