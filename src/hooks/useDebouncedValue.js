import { useEffect, useState } from "react";

export function useDebouncedValue(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const time = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(time);
  }, [value, delayMs]);

  return debounced;
}
