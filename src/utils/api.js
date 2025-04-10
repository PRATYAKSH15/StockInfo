import axios from 'axios';

const API_BASE_URL = 'https://stock.indianapi.in/v1';

// Create axios instance with common headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add your API key if required
    // 'Authorization': 'Bearer YOUR_API_KEY'
  }
});

/**
 * Fetch market indices (Nifty, Sensex, etc.)
 */
export const fetchMarketIndices = async () => {
  try {
    const response = await api.get('/indices');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching market indices:', error);
    return [];
  }
};

/**
 * Fetch top gainers
 */
export const fetchTopGainers = async () => {
  try {
    const response = await api.get('/stocks/gainers');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    return [];
  }
};

/**
 * Fetch top losers
 */
export const fetchTopLosers = async () => {
  try {
    const response = await api.get('/stocks/losers');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching top losers:', error);
    return [];
  }
};

/**
 * Fetch stock details by symbol
 */
export const fetchStockDetails = async (symbol) => {
  try {
    const response = await api.get(`/stocks/${symbol}`);
    return response.data.data || null;
  } catch (error) {
    console.error(`Error fetching details for ${symbol}:`, error);
    return null;
  }
};

/**
 * Fetch historical data for a stock
 */
export const fetchHistoricalData = async (symbol, period = '1m') => {
  try {
    const response = await api.get(`/stocks/${symbol}/history`, {
      params: { period }
    });
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    return [];
  }
};

/**
 * Search stocks by query
 */
export const searchStocks = async (query) => {
  try {
    const response = await api.get('/stocks/search', {
      params: { query }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

/**
 * Fetch stock news
 */
export const fetchStockNews = async (limit = 10) => {
  try {
    const response = await api.get('/news', {
      params: { limit }
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return [];
  }
};

/**
 * Fetch all listed stocks
 */
export const fetchAllStocks = async () => {
  try {
    const response = await api.get('/stocks');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching all stocks:', error);
    return [];
  }
};

/**
 * Fetch user's watchlist stocks
 * @param {string} userId - Optional user ID (for future authenticated requests)
 * @returns {Promise<Array>} - Array of watchlist stocks
 */
export const fetchWatchlistStocks = async (userId = null) => {
  try {
    // In a real app, this would fetch from user's watchlist
    // For demo, we'll return a fixed list of popular stocks
    const demoWatchlist = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        price: 2756.35,
        change: 1.25,
        high: 2768.90,
        low: 2732.45
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        price: 3854.60,
        change: -0.75,
        high: 3872.30,
        low: 3821.15
      },
      {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank',
        price: 1653.80,
        change: 0.92,
        high: 1665.40,
        low: 1638.25
      },
      {
        symbol: 'INFY',
        name: 'Infosys',
        price: 1523.45,
        change: 1.82,
        high: 1530.20,
        low: 1508.75
      }
    ];

    // If you have an actual API endpoint:
    // const response = await api.get(`/watchlist${userId ? `?user=${userId}` : ''}`);
    // return response.data.data || [];
    
    return demoWatchlist;
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return [];
  }
};

// Add more API functions as needed

export default {
  fetchMarketIndices,
  fetchTopGainers,
  fetchTopLosers,
  fetchStockDetails,
  fetchHistoricalData,
  searchStocks,
  fetchStockNews,
  fetchAllStocks,
  fetchWatchlistStocks
};