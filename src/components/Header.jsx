import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="bg-white p-2 rounded-full"
          >
            <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white"
          >
            StockInfo
          </motion.h1>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          {['Home', 'Stocks', 'News', 'Watchlist'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link 
                to={`/${item.toLowerCase()}`} 
                className="text-white hover:text-indigo-200 font-medium transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold"
        >
          Sign In
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;