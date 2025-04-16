import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { aiSearch } from '@/services/aiSearchService';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/search/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchResult } from '@/types/search';
import { Search as SearchIcon } from 'lucide-react';

const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = aiSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      // Handle error appropriately (e.g., display an error message)
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchClick = () => {
    navigate(`/search?q=${searchQuery}`);
    handleSearch(searchQuery);
  };

  const resetSearch = () => {
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchClick={handleSearchClick}
          resetSearch={resetSearch}
          isSearching={isSearching}
        />

        {searchResults && (
          <div className="mt-8">
            <Tabs defaultValue="exact" className="w-full">
              <TabsList>
                <TabsTrigger value="exact">
                  Exact Matches ({searchResults.exactMatches.length})
                </TabsTrigger>
                <TabsTrigger value="recommended">
                  Recommended ({searchResults.recommendedMatches.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="exact" className="mt-4">
                {searchResults.exactMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.exactMatches.map((property) => (
                      <PropertyCard key={property.id} prop={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <SearchIcon className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No exact matches found.</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recommended" className="mt-4">
                {searchResults.recommendedMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.recommendedMatches.map((property) => (
                      <PropertyCard key={property.id} prop={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <SearchIcon className="h-6 w-6 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No recommended matches found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {!isSearching && searchResults === null && (
          <div className="text-center mt-12">
            <SearchIcon className="h-10 w-10 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Enter a search query to find properties.</p>
          </div>
        )}

        {isSearching && (
          <div className="text-center mt-12">
            <p className="text-gray-600">Searching for properties...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
