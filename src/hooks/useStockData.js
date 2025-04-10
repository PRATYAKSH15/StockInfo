import { useState, useEffect } from 'react';
import { 
  fetchTopGainers, 
  fetchTopLosers, 
  fetchStockDetails, 
  fetchHistoricalData,
  fetchMarketIndices,
  fetchStockNews
} from '../utils/api';

export const useStockData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    gainers: [],
    losers: [],
    indices: [],
    news: []
  });

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [gainers, losers, indices, news] = await Promise.all([
        fetchTopGainers(),
        fetchTopLosers(),
        fetchMarketIndices(),
        fetchStockNews()
      ]);
      
      setData({
        gainers,
        losers,
        indices,
        news
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStock = async (symbol) => {
    try {
      setLoading(true);
      const [details, history] = await Promise.all([
        fetchStockDetails(symbol),
        fetchHistoricalData(symbol)
      ]);
      return { details, history };
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching stock ${symbol}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    loading,
    error,
    data,
    fetchStock,
    refreshData: fetchAllData
  };
};