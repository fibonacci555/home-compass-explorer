
import React from 'react';
import { Button } from '@/components/ui/button';

interface BedroomsQuestionProps {
  bedrooms: number;
  setBedrooms: (num: number) => void;
}

export default function BedroomsQuestion({ bedrooms, setBedrooms }: BedroomsQuestionProps) {
  return (
    <div className="flex justify-between gap-3">
      {[1, 2, 3, 4, 5].map((num) => (
        <Button
          key={num}
          variant={bedrooms === num ? 'default' : 'outline'}
          className={`flex-1 h-14 text-xl ${
            bedrooms === num 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:border-blue-700'
          }`}
          onClick={() => setBedrooms(num)}
        >
          {num}
        </Button>
      ))}
    </div>
  );
}
