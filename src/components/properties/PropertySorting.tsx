
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertySortingProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const PropertySorting: React.FC<PropertySortingProps> = ({ sortBy, setSortBy }) => {
  return (
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
  );
};

export default PropertySorting;
