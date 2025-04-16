
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchResult } from '@/types/search';

interface SearchResultsProps {
  selectedResult: SearchResult;
}

export default function SearchResults({ selectedResult }: SearchResultsProps) {
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
      <div className="relative">
        <img 
          src={selectedResult.image} 
          alt={selectedResult.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {selectedResult.match}% Match
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {selectedResult.title}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{selectedResult.location}</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          {selectedResult.price}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" className="flex-1 mr-2">
            See Details
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <DollarSign className="h-4 w-4 mr-1" />
            Request Tour
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          onClick={() => alert('Showing all 91 matching properties')}
        >
          View all 91 matching properties
        </Button>
      </div>
    </motion.div>
  );
}
