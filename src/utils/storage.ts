export const getLocalStorage = (key: string) => {
  const data = window.localStorage?.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setLocalStorage = <T>(key: string, data: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error while setting localStorage:', error);
  }
};
