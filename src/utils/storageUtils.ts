// Helper function to safely parse JSON from localStorage
export const getStorageValue = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return {};
  }
};

export const setStorageValue = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

export const removeStorageValue = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};