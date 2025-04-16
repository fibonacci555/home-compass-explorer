
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface SimpleLocationDropdownProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: string[];
}

export default function SimpleLocationDropdown({
  selectedLocation,
  setSelectedLocation,
  locations = [] // Provide default empty array
}: SimpleLocationDropdownProps) {
  // Ensure locations is always an array
  const safeLocations = Array.isArray(locations) ? locations : [];
  
  return (
    <Select
      value={selectedLocation}
      onValueChange={setSelectedLocation}
    >
      <SelectTrigger className="w-full h-14">
        <SelectValue placeholder="Select a location..." />
      </SelectTrigger>
      <SelectContent>
        {safeLocations.length === 0 ? (
          <SelectItem value="no-locations" disabled>
            No locations available
          </SelectItem>
        ) : (
          safeLocations.map((location) => (
            <SelectItem key={location} value={location}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
