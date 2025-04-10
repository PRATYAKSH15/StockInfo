import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import StockChart from '../components/StockChart';
import { fetchStockDetails, fetchHistoricalData } from '../utils/api';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1m');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [details, history] = await Promise.all([
          fetchStockDetails(symbol),
          fetchHistoricalData(symbol, timeRange)
        ]);
        
        setStock(details);
        setHistoricalData(history);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [symbol, timeRange]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!stock) {
    return <div className="flex justify-center items-center h-screen">Stock not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{stock.name}</h1>
              <p className="text-gray-600">{stock.symbol} • {stock.exchange}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-end">
                <span className="text-3xl font-bold mr-2">₹{stock.price.toLocaleString()}</span>
                <span className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </span>
              </div>
              <p className="text-gray-500 text-sm">As of {new Date(stock.lastUpdated).toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">Open</p>
              <p className="font-semibold">₹{stock.open.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">High</p>
              <p className="font-semibold">₹{stock.high.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">Low</p>
              <p className="font-semibold">₹{stock.low.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500 text-sm">Volume</p>
              <p className="font-semibold">{stock.volume.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-2 mb-4">
            {['1d', '1w', '1m', '3m', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md ${timeRange === range ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {range}
              </button>
            ))}
          </div>
          <StockChart historicalData={historicalData} />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Sector</p>
              <p className="font-medium">{stock.sector}</p>
            </div>
            <div>
              <p className="text-gray-500">Market Cap</p>
              <p className="font-medium">₹{stock.marketCap.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">P/E Ratio</p>
              <p className="font-medium">{stock.peRatio}</p>
            </div>
            <div>
              <p className="text-gray-500">Dividend Yield</p>
              <p className="font-medium">{stock.dividendYield}%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StockDetail;