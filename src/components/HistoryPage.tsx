import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';


interface HistoryPageProps {
  calcHistory: string[];
  onClearHistory: () => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ calcHistory, onClearHistory }) => {
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      const container = historyRef.current;
      const hasOverflow = container.scrollHeight > container.clientHeight;
      container.style.overflowY = hasOverflow ? 'scroll' : 'initial';
    }
  }, [calcHistory]);

  return (
    <motion.div
    ref={historyRef} 
    className="history-page p-6 bg-gray-100 rounded-lg shadow-md"
    style={{ maxHeight: '100vh' }}
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    transition={{ duration: 0.5 }}
  >
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-xl font-bold text-center text-indigo-700 mr-5'>Calculation History</h1>
        <button
          type='button'
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition-colors"
          onClick={onClearHistory}
        >
          Clear History
        </button>
      </div>
      <div ref={historyRef}>
        <ul className='divide-y divide-gray-300'>
          {calcHistory.map((calc, index) => (
            <li className='py-3' key={index}>
              <span className='text-lg font-semibold text-indigo-600'>{calc}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default HistoryPage;
