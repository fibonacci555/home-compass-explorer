import React, { useState, useEffect } from 'react';
import { properties } from '@/data/properties';
import { Home, Filter, X, Check, DollarSign, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { toast } from 'sonner';

const PropertiesPage = () => {
  const [priceRange, setPriceRange] = useState([500000, 5000000]);
  const [minBedrooms, setMinBedrooms] = useState<string | undefined>(undefined);
  const [minBathrooms, setMinBathrooms] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("recommended");
  const [features, setFeatures] = useState({
    pool: false,
    garage: false,
    garden: false,
    balcony: false,
  });
  
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isFiltering, setIsFiltering] = useState(false);

  // Apply filters automatically when any filter changes
  useEffect(() => {
    setIsFiltering(true);
    
    const applyFilters = () => {
      let result = [...properties];
      
      // Filter by price range
      result = result.filter(property => {
        const price = parseInt(property.price.replace(/[^0-9]/g, ''));
        return price >= priceRange[0] && price <= priceRange[1];
      });
      
      // Filter by bedrooms
      if (minBedrooms) {
        result = result.filter(property => property.bedrooms >= parseInt(minBedrooms));
      }
      
      // Filter by bathrooms
      if (minBathrooms) {
        result = result.filter(property => property.bathrooms >= parseInt(minBathrooms));
      }
      
      // Filter by features
      const activeFeatures = Object.entries(features)
        .filter(([_, active]) => active)
        .map(([name]) => name);
      
      if (activeFeatures.length > 0) {
        result = result.filter(property => {
          // Assuming property has features array or similar
          // This is a simplified example - adjust based on your actual data structure
          return activeFeatures.some(feature => 
            property.features && property.features.includes(feature)
          );
        });
      }
      
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
  }, [priceRange, minBedrooms, minBathrooms, features, sortBy]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };
  
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Available Properties
          </h1>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <Slider 
                        defaultValue={[priceRange[0], priceRange[1]]} 
                        max={10000000} 
                        min={100000} 
                        step={50000} 
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      />
                      <div className="flex justify-between">
                        <span className="text-sm">{formatPrice(priceRange[0])}</span>
                        <span className="text-sm">{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Min Bedrooms</label>
                      <Select value={minBedrooms} onValueChange={setMinBedrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Min Bathrooms</label>
                      <Select value={minBathrooms} onValueChange={setMinBathrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Features</h3>
                    <div className="space-y-2">
                      {Object.entries(features).map(([key, checked]) => (
                        <div className="flex items-center space-x-2" key={key}>
                          <Checkbox 
                            id={`feature-${key}`} 
                            checked={checked}
                            onCheckedChange={(value) => setFeatures({
                              ...features, 
                              [key]: !!value
                            })}
                          />
                          <label 
                            htmlFor={`feature-${key}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFiltering ? (
            // Loading state with skeleton cards
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="flex justify-between space-x-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {property.match}% Match
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{property.title}</h3>
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{property.location}</p>
                  </div>
                  
                  <div className="flex justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{property.price}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <h3 className="text-xl font-semibold">No properties found</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your filters to see more results
              </p>
              <Button onClick={resetFilters}>Reset All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
