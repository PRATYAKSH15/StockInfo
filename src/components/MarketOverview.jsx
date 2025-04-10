import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const MarketOverview = ({ indices }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-700 to-blue-800 rounded-xl p-6 text-white shadow-lg">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Market Overview
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((index, i) => {
          const isPositive = index.change >= 0;
          return (
            <motion.div
              key={index.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{index.name}</h3>
                  <p className="text-sm opacity-80">{index.symbol}</p>
                </div>
                <div className={`flex items-center ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                  {isPositive ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(index.change)}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold mt-2">₹{index.price.toLocaleString()}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketOverview;