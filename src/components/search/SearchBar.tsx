
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchClick: () => void;
  resetSearch: () => void;
  isSearching?: boolean;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearchClick,
  resetSearch,
  isSearching = false
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-full px-6 py-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-300 flex items-center">
      <Search className="h-5 w-5 text-blue-600 mr-3" />
      <input
        type="text"
        placeholder="Search city, address, or property type (e.g. 'T2 in Los Angeles')..."
        className="flex-1 bg-transparent placeholder-gray-500 text-gray-800 focus:outline-none font-medium transition-all duration-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={resetSearch}
        onKeyDown={handleKeyDown}
      />
      <Button 
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
        onClick={handleSearchClick}
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            Searching...
          </>
        ) : (
          <>
            Search with AI
          </>
        )}
      </Button>
    </div>
  );
}
