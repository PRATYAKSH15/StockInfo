import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StockCard from "components/StockCard";
import { fetchMatchListStocks } from "../utils/api";

const MatchList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      const data = await fetchMatchListStocks();
      setStocks(data);
    };
    loadStocks();
  }, []);

  return (
    <div className="p-4">
      {stocks.map((stock) => (
        <motion.div key={stock.id} whileHover={{ scale: 1.02 }}>
          <StockCard stock={stock} />
        </motion.div>
      ))}
    </div>
  );
};

export default MatchList;