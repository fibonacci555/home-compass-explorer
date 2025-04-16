import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import MapView from '@/components/MapView';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import { debounce } from 'lodash';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  // Filter properties based on search query
  const filteredProperties = searchQuery
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative mb-4 lg:mb-0 lg:w-1/3">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search properties by title or location..."
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full p-2 bg-transparent outline-none text-gray-900 dark:text-white"
              aria-label="Search properties"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {isSearchFocused && filteredProperties.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-1">
              <p className="text-gray-500">No properties found.</p>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="flex-1 h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] rounded-lg shadow-md overflow-hidden">
          {properties.length === 0 ? (
            <div className="h-full flex items-center justify-center bg-white dark:bg-gray-800">
              <p className="text-gray-500">No properties available.</p>
            </div>
          ) : (
            <MapView properties={filteredProperties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;