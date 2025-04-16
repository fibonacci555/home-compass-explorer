
import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingAnimation() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 backdrop-blur-lg flex flex-col items-center justify-center"
    >
      <div className="w-16 h-16 border-t-4 border-blue-600 dark:border-blue-400 border-solid rounded-full animate-spin mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Finding your perfect match</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center">
        Analyzing properties based on your preferences...
      </p>
    </motion.div>
  );
}
