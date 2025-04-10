import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StockCard from '@/components/StockCard'; 
import { fetchAllStocks } from '../utils/api';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [exchange, setExchange] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const data = await fetchAllStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExchange = exchange === 'all' || stock.exchange.toLowerCase() === exchange;
    return matchesSearch && matchesExchange;
  });

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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">All Stocks</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setExchange('all')}
                className={`px-4 py-2 rounded-lg ${exchange === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => setExchange('nse')}
                className={`px-4 py-2 rounded-lg ${exchange === 'nse' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                NSE
              </button>
              <button
                onClick={() => setExchange('bse')}
                className={`px-4 py-2 rounded-lg ${exchange === 'bse' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                BSE
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredStocks.map((stock, index) => (
            <motion.div
              key={stock.symbol}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/stocks/${stock.symbol}`)}
            >
              <StockCard stock={stock} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Stocks;