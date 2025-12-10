// src/utils/storage.ts

// Generic get: <T> means you can specify type like storage.get<User>("user")
export const storage = {
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (err) {
      console.error("Failed to save to storage", err);
    }
  },

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.error("Failed to read from storage", err);
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  }
};
