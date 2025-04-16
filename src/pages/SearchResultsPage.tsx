import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/search/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { aiSearch } from '@/services/aiSearchService';
import { Property } from '@/data/properties';
import { Button } from '@/components/ui/button';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [exactMatches, setExactMatches] = useState<Property[]>([]);
  const [recommendedMatches, setRecommendedMatches] = useState<Property[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const performSearch = (query: string) => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = aiSearch(query);
      setExactMatches(results.exactMatches);
      setRecommendedMatches(results.recommendedMatches);
      setIsSearching(false);
    }, 800);
  };
  
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const handleSearchClick = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    performSearch(searchQuery);
  };
  
  const resetSearch = () => {
    // Keep current search query but allow user to edit
  };
  
  const renderPropertyGrid = (properties: Property[], title: string) => {
    if (properties.length === 0) return null;
    
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} prop={property} />
          ))}
        </div>
      </div>
    );
  };
  
  const noResultsMessage = (
    <div className="text-center py-12">
      <div className="mb-4">
        <Search className="h-16 w-16 mx-auto text-gray-300" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No properties found</h3>
      <p className="text-gray-500 mb-6">Try adjusting your search terms or browse all properties</p>
      <Button onClick={() => navigate('/properties')}>Browse All Properties</Button>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="mb-4 flex items-center text-blue-600 hover:bg-blue-50"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl font-bold mb-6">Search Results</h1>
            
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchClick={handleSearchClick}
              resetSearch={resetSearch}
              isSearching={isSearching}
            />
            
            {isSearching ? (
              <div className="py-12">
                <div className="flex justify-center">
                  <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>
                <p className="text-center mt-4 text-gray-600">Searching for properties...</p>
              </div>
            ) : (
              <>
                {exactMatches.length === 0 && recommendedMatches.length === 0 ? (
                  noResultsMessage
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderPropertyGrid(exactMatches, 'Matching Properties')}
                    {renderPropertyGrid(recommendedMatches, 'You Might Also Like')}
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
