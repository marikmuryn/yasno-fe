export const getLocalStorage = <T>(key: string): T | null => {
  const data = window.localStorage.getItem(key);
  try {
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error(`Error parsing local storage data for key: ${key}`);
    return null;
  }
};

export const setLocalStorage = <T>(key: string, data: T): void => {
  window.localStorage.setItem(key, JSON.stringify(data));
};
