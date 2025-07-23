import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const SECURE_STORAGE_KEYS = {
  TOKEN: 'TOKEN',

};

const ASYNC_STORAGE_KEYS = {
  USER_DETAILS: 'USER_DETAILS',

};

const STORAGE_KEYS = {
  ...SECURE_STORAGE_KEYS,
  ...ASYNC_STORAGE_KEYS,
};

const SecureStorage = {
  /**
   * Returns a Promise that resolved the value of the key if present, or undefined if not.
   */
  get: async (key: string) => EncryptedStorage.getItem(key),
  /**
   * Asynchronously sets the value in the secure storage. Accepts any value and sanitizes it to a string.
   */
  set: async (key: string, value: any) =>
    EncryptedStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)),
  /**
   * Securely removes a key from the storage.
   */
  remove: async (key: string) => EncryptedStorage.removeItem(key),
  clear: async () => EncryptedStorage.clear(),
};

export const Storage = {
  get: (key: string) => {
    if (key in SECURE_STORAGE_KEYS) {
      return SecureStorage.get(key);
    }
    return AsyncStorage.getItem(key);
  },
  set: (key: string, value: any) => {
    if (key in SECURE_STORAGE_KEYS) {
      return SecureStorage.set(key, value);
    }
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    if (key in SECURE_STORAGE_KEYS) {
      return SecureStorage.remove(key);
    }
    return AsyncStorage.removeItem(key);
  },
  clear: () => {
    return Promise.all([SecureStorage.clear(), AsyncStorage.clear()]);
  },
  KEYS: STORAGE_KEYS,
};
