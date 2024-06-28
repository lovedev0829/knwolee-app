import { useState } from "react";

type StoredValue<T> = T | (() => T);

export function useLocalStorage<T>(key: string, defaultValue?: StoredValue<T>) {
  const [value, set] = useState<T | undefined>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return (defaultValue as () => T)();
    } else {
      return defaultValue;
    }
  });

  function setValue(value?: T) {
    set(value);
    if (value === undefined) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, setValue] as const;
}
