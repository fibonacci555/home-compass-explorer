
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface LocationQuestionProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  locations: string[];
}

export default function LocationQuestion({
  selectedLocation,
  setSelectedLocation,
  locations
}: LocationQuestionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between text-left font-normal h-14 px-4 py-6 border-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
        >
          {selectedLocation || "Select a location..."}
          <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {locations.map((location) => (
              <CommandItem
                key={location}
                onSelect={() => {
                  setSelectedLocation(location);
                }}
                className="flex items-center gap-2 p-2"
              >
                <MapPin className="h-4 w-4" />
                {location}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
