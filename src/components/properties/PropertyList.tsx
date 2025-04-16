
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyListItem from './PropertyListItem';

interface PropertyListProps {
  filteredProperties: any[];
  isFiltering: boolean;
  resetFilters: () => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ 
  filteredProperties, 
  isFiltering, 
  resetFilters 
}) => {
  if (isFiltering) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
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
        ))}
      </div>
    );
  }

  if (filteredProperties.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <PropertyListItem key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
