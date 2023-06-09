import localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';

localforage.defineDriver(memoryDriver);

export interface StorageService {
  set<T = unknown>(_key: string, _data: T): Promise<T | null>;
  get<T = unknown>(_key: string): Promise<T | null>;
  remove(_key: string): Promise<boolean>;
}

class IndexedDBService implements StorageService {
  private _storage: LocalForage = localforage;
  private storeName = 'STORE_DB';
  private version = 1.0;

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
      name: this.storeName,
      version: this.version,
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

  async remove(key: string) {
    try {
      this._storage.removeItem(key);

      return true;
    } catch (_) {
      return false;
    }
  }
}

export default new IndexedDBService();
