import { parseCSV } from './csvParser';

const CACHE_KEY = 'stockData';
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchStockData() {
  const cached = getCache();
  if (cached) {
    return cached.data;
  }

  const response = await fetch('https://raw.githubusercontent.com/shaktids/stock_app_test/refs/heads/main/dump.csv');
  const csvText = await response.text();
  
  const data = parseCSV(csvText)
    .reduce((unique, item) => {
      const exists = unique.find(x => x.index_name === item.index_name);
      if (!exists) {
        unique.push(item);
      }
      return unique;
    }, [])
    .sort((a, b) => a.index_name.localeCompare(b.index_name));

  setCache(data);
  
  return data;
}

function getCache() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  return { data, timestamp };
}

function setCache(data) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
}