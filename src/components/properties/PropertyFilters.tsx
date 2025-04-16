
import React from 'react';
import { Filter, X, Check } from 'lucide-react';
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
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyFiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minBedrooms: string | undefined;
  setMinBedrooms: (value: string | undefined) => void;
  minBathrooms: string | undefined;
  setMinBathrooms: (value: string | undefined) => void;
  features: Record<string, boolean>;
  setFeatures: (features: Record<string, boolean>) => void;
  resetFilters: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  priceRange,
  setPriceRange,
  minBedrooms,
  setMinBedrooms,
  minBathrooms,
  setMinBathrooms,
  features,
  setFeatures,
  resetFilters
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  return (
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
  );
};

export default PropertyFilters;
