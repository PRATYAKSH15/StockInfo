import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const StockCard = ({ stock }) => {
  const isPositive = stock.change >= 0;
  
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl p-4 shadow-md cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{stock.symbol}</h3>
          <p className="text-gray-500 text-sm">{stock.name}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span>{Math.abs(stock.change)}%</span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold">₹{stock.price.toLocaleString()}</p>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>High: ₹{stock.high.toLocaleString()}</span>
          <span>Low: ₹{stock.low.toLocaleString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StockCard;