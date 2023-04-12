import * as React from "react";

interface DataHandlers<T> {
  serialize: (data: T) => string;
  deserialize: (data: string) => T;
}

export function useLocalStorage<T = any>(
  key: string
): [T | undefined, React.Dispatch<React.SetStateAction<T>>];

export function useLocalStorage<T = any>(
  key: string,
  defaultValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>];

export function useLocalStorage<T = any>(
  key: string,
  defaultValue: undefined,
  dataHandlers: Partial<DataHandlers<T>>
): [T | undefined, React.Dispatch<React.SetStateAction<T>>];

export function useLocalStorage<T = any>(
  key: string,
  defaultValue: T | (() => T),
  dataHandlers: Partial<DataHandlers<T>>
): [T, React.Dispatch<React.SetStateAction<T>>];

export function useLocalStorage<T = any>(
  key: string,
  defaultValue?: T | (() => T),
  dataHandlers: Partial<DataHandlers<T>> = {}
): [T | undefined, React.Dispatch<React.SetStateAction<T>>] {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = dataHandlers;
  const [state, setState] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return isFunction(defaultValue) ? defaultValue() : defaultValue;
    }

    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (e) {
        window.localStorage.removeItem(key);
      }
    }

    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}

function isFunction<T>(a: T | (() => T)): a is () => T {
  return typeof a === "function";
}
