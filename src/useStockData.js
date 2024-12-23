import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useStockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const csvUrl = 'https://raw.githubusercontent.com/shaktids/stock_app_test/refs/heads/main/dump.csv';  
        
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setStockData(results.data);
            setLoading(false);
          },
          error: (err) => {
            setError('Error parsing CSV data');
            setLoading(false);
          }
        });
      } catch (err) {
        setError('Error fetching CSV data');
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return { stockData, loading, error };
};

export default useStockData;
