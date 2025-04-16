
import React from 'react';
import { properties } from '@/data/properties';
import Navbar from '@/components/Navbar';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertySorting from '@/components/properties/PropertySorting';
import PropertyList from '@/components/properties/PropertyList';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';

const PropertiesPage = () => {
  const {
    priceRange,
    setPriceRange,
    minBedrooms,
    setMinBedrooms,
    minBathrooms,
    setMinBathrooms,
    sortBy,
    setSortBy,
    features,
    setFeatures,
    filteredProperties,
    isFiltering,
    resetFilters
  } = usePropertyFilters(properties);

  // Convert setFeatures to accept a complete object (Record<string, boolean>)
  const handleFeaturesChange = (newFeatures: Record<string, boolean>) => {
    setFeatures(newFeatures);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Available Properties
          </h1>
          
          <div className="flex gap-2">
            <PropertySorting sortBy={sortBy} setSortBy={setSortBy} />
            
            <PropertyFilters 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minBedrooms={minBedrooms}
              setMinBedrooms={setMinBedrooms}
              minBathrooms={minBathrooms}
              setMinBathrooms={setMinBathrooms}
              features={features}
              setFeatures={handleFeaturesChange}
              resetFilters={resetFilters}
            />
          </div>
        </div>
        
        <PropertyList 
          filteredProperties={filteredProperties}
          isFiltering={isFiltering}
          resetFilters={resetFilters}
        />
      </div>
    </div>
  );
};

export default PropertiesPage;
