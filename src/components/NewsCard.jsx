import { motion } from 'framer-motion';
import { ClockIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const NewsCard = ({ news }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={news.imageUrl || 'https://via.placeholder.com/400x200?text=Stock+News'} 
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{news.source}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {news.category}
          </span>
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
          >
            Read more <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;