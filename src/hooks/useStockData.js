import { useState, useEffect, useCallback } from 'react';
import { fetchStockData } from '../utils/fetchData';

export function useStockData() {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null
  });

  const loadData = useCallback(async () => {
    try {
      const data = await fetchStockData();
      setState({
        data,
        loading: false,
        error: null
      });
    } catch (err) {
      setState({
        data: [],
        loading: false,
        error: 'Failed to load stock data'
      });
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const controller = new AbortController();
    
    (async () => {
      if (mounted) {
        await loadData();
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [loadData]);

  return {
    ...state,
    refresh: loadData
  };
}