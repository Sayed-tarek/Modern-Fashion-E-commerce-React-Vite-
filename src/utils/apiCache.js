/**
 * Lightweight JSON Data Fetching Cache
 * Prevents duplicate network requests across routes and re-renders.
 */

const cache = new Map();

export const fetchCachedJson = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, data);
  return data;
};

export const clearApiCache = () => {
  cache.clear();
};
