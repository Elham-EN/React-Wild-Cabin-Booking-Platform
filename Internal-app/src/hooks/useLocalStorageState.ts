import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface UseLocalStorageStateResult<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

function useLocalStorageState<T>(
  initialState: T,
  key: string
): UseLocalStorageStateResult<T> {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue };
}

export { useLocalStorageState };
