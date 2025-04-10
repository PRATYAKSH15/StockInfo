import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard';
import { fetchStockNews } from '../utils/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await fetchStockNews(category);
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [category]);

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
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Market News</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'markets', 'stocks', 'economy', 'ipo', 'technology'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full capitalize ${category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {news.map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default News;