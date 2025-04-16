
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchResult } from '@/types/search';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchClick: () => void;
  resetSearch: () => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearchClick,
  resetSearch
}: SearchBarProps) {
  return (
    <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700 flex items-center">
      <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
      <input
        type="text"
        placeholder="Search city, address, or property type..."
        className="flex-1 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 focus:outline-none font-medium transition-all duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={resetSearch}
      />
      <Button 
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
        onClick={handleSearchClick}
      >
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
