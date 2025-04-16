
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define the FeatureToggles interface for better type safety
export interface FeatureToggles {
  pool: boolean;
  garage: boolean;
  garden: boolean;
  balcony: boolean;
  [key: string]: boolean; // Add index signature to make it assignable to Record<string, boolean>
}

export const usePropertyFilters = (properties: any[]) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([500000, 5000000]);
  const [minBedrooms, setMinBedrooms] = useState<string | undefined>(undefined);
  const [minBathrooms, setMinBathrooms] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("recommended");
  const [features, setFeatures] = useState<FeatureToggles>({
    pool: false,
    garage: false,
    garden: false,
    balcony: false,
  });
  
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isFiltering, setIsFiltering] = useState(false);

  const resetFilters = () => {
    setPriceRange([500000, 5000000]);
    setMinBedrooms(undefined);
    setMinBathrooms(undefined);
    setFeatures({
      pool: false,
      garage: false,
      garden: false,
      balcony: false,
    });
    toast("Filters have been reset");
  };

  // Apply filters automatically when any filter changes
  useEffect(() => {
    setIsFiltering(true);
    
    const applyFilters = () => {
      let result = [...properties];
      
      // Keep track of how many filters each property passes
      const propertyScores = properties.map(property => {
        let score = 0;
        let totalFilters = 0;
        
        // Filter by price range
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        if (price >= priceRange[0] && price <= priceRange[1]) {
          score++;
        }
        totalFilters++;
        
        // Filter by bedrooms
        if (minBedrooms) {
          totalFilters++;
          if (property.bedrooms >= parseInt(minBedrooms)) {
            score++;
          }
        }
        
        // Filter by bathrooms
        if (minBathrooms) {
          totalFilters++;
          if (property.bathrooms >= parseInt(minBathrooms)) {
            score++;
          }
        }
        
        // Filter by features
        const activeFeatures = Object.entries(features)
          .filter(([_, active]) => active)
          .map(([name]) => name);
        
        if (activeFeatures.length > 0) {
          totalFilters += activeFeatures.length;
          // Count how many selected features the property has
          activeFeatures.forEach(feature => {
            if (property.features && property.features.includes(feature)) {
              score++;
            }
          });
        }
        
        // Calculate match percentage
        const matchPercentage = totalFilters > 0 ? Math.round((score / totalFilters) * 100) : 100;
        
        return {
          ...property,
          match: matchPercentage,
          passesFilters: matchPercentage > 0 // Property must match at least one filter to be included
        };
      });
      
      // Filter out properties that don't pass any filters
      result = propertyScores.filter(property => {
        // Price is mandatory filter
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        return price >= priceRange[0] && price <= priceRange[1] && property.passesFilters;
      });
      
      // Sort properties
      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
            return priceA - priceB;
          });
          break;
        case "price-desc":
          result.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
            return priceB - priceA;
          });
          break;
        case "newest":
          // Assuming properties have a 'date' property
          result.sort((a, b) => {
            const dateA = a.listedDate ? new Date(a.listedDate).getTime() : 0;
            const dateB = b.listedDate ? new Date(b.listedDate).getTime() : 0;
            return dateB - dateA;
          });
          break;
        // If recommended or other, keep original order
      }
      
      setFilteredProperties(result);
      setIsFiltering(false);
      
      // Show toast notification about filter results
      toast(`Found ${result.length} properties matching your criteria`);
    };
    
    // Debounce filter application to avoid excessive re-renders during slider movement
    const timeoutId = setTimeout(applyFilters, 300);
    
    return () => clearTimeout(timeoutId);
  }, [priceRange, minBedrooms, minBathrooms, features, sortBy, properties]);

  return {
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
  };
};
