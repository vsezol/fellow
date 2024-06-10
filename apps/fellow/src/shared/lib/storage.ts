export class Storage {
  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | undefined {
    try {
      const data = localStorage.getItem(key);

      if (!data) {
        return undefined;
      }

      const parsed = JSON.parse(data);

      return parsed ?? undefined;
    } catch {
      console.log(`[Storage] cannot get ${key} from storage`);
    }

    return undefined;
  }
}
