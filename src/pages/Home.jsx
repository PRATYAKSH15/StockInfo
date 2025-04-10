import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StockCard from "@/components/StockCard";
import MarketOverview from '../components/MarketOverview';
import { fetchTopGainers, fetchTopLosers, fetchMarketIndices } from '../utils/api';

const Home = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gainersData, losersData, indicesData] = await Promise.all([
          fetchTopGainers(),
          fetchTopLosers(),
          fetchMarketIndices()
        ]);
        
        setGainers(gainersData);
        setLosers(losersData);
        setIndices(indicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <MarketOverview indices={indices} />
        </motion.section>

        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Gainers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gainers.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Losers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {losers.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;