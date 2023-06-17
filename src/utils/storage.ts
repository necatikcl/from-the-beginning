export default {
  get<T>(key: string) {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item) as T;
  },
  set<T>(key: string, value: T) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
};
