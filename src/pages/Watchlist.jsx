import {useEffect, useState} from 'react';
import motion from 'framer-motion';
import StockCard from "@/components/StockCard";
import { fetchWatchlistStocks } from '../utils/api';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from user's watchlist
        // For demo, we'll use top gainers as watchlist items
        const data = await fetchWatchlistStocks();
        setWatchlist(data);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWatchlist();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Watchlist</h1>
          <p className="text-gray-600">Track your favorite stocks here</p>
        </motion.div>

        {watchlist.length > 0 ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {watchlist.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-4">Add stocks to your watchlist to track them here</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Browse Stocks
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;