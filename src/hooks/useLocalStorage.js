import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // 初回のみlocalStorageを読み込ませる
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('localStorageに保存できませんでした:', err);
    }
  }, [key, value]);

  return [value, setValue];
}
