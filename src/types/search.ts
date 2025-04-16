
import { ReactNode } from 'react';
import { Property } from '@/types/property';

export interface SearchResult {
  exactMatches: Property[];
  recommendedMatches: Property[];
}

export interface PropertyType {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface LocationOption {
  id: string;
  name: string;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  stars: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyTypes: string[];
  features: string[];
}
