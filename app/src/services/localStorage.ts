export class LocalStorageService {
  /**
   * Stores variable to local storage 
   * @param items - Object (key = string, value = any)
   */
  save<T>(items: Record<string, T>): void {
    Object.entries(items).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * Load variable from user local storage
   * @param keys - name of variable in user local storage
   * @returns value type T or null if not found
   */
  load<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    return json !== null
      ? (JSON.parse(json) as T)
      : null;
  }

  /**
   * Delete variable if existed in local storage 
   * @param keys - name of variable in user local storage
   */
  delete(key: string): void {
    localStorage.removeItem(key);
  }
}

export const LOCAL_STORAGE = Object.freeze({
  accessToken: {
    key: 'accessToken',
    description: 'Bearer access token',
  },
} as const);
