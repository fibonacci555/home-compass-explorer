
import React from 'react';
import { Button } from '@/components/ui/button';
import { PropertyType } from '@/types/search';

interface PropertyTypeQuestionProps {
  propertyType: string;
  setPropertyType: (type: string) => void;
  propertyTypes: PropertyType[];
}

export default function PropertyTypeQuestion({
  propertyType,
  setPropertyType,
  propertyTypes
}: PropertyTypeQuestionProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {propertyTypes.map((type) => {
        const Icon = type.icon;
        return (
          <Button
            key={type.id}
            variant={propertyType === type.id ? 'default' : 'outline'}
            className={`h-20 flex flex-col items-center justify-center space-y-2 ${
              propertyType === type.id 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:border-blue-700'
            }`}
            onClick={() => setPropertyType(type.id)}
          >
            <Icon className="h-6 w-6" />
            <span>{type.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
