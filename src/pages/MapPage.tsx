
import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import MapView from '@/components/MapView';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import { debounce } from 'lodash';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/types/property';
import { Link } from 'react-router-dom';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

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
      <div className="flex-1 container mx-auto p-4 flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search properties by title or location..."
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
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
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-1 z-50">
              <p className="text-gray-500">No properties found.</p>
            </div>
          )}
        </div>

        {/* Property Cards (when searching) */}
        {searchQuery && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filteredProperties.slice(0, 3).map((property) => (
              <Card 
                key={property.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveProperty(property)}
              >
                <div className="relative h-40">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{property.location}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-emerald-600 font-bold">{property.price}</p>
                    <Link
                      to={`/properties/${property.id}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredProperties.length > 3 && (
              <div className="flex items-center justify-center p-4">
                <Link
                  to={`/properties?search=${searchQuery}`}
                  className="text-blue-600 hover:underline"
                >
                  View all {filteredProperties.length} results
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Map Section - Made smaller to accommodate property cards */}
        <div className="flex-1 h-[calc(100vh-16rem)] lg:h-[calc(100vh-12rem)] rounded-lg shadow-md overflow-hidden">
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
