
import { SearchResult } from '@/types/search';

export const mockResults: SearchResult[] = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    location: 'Miami Beach, Florida',
    price: '$3,250,000',
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2187&auto=format&fit=crop',
    match: 96,
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    location: 'Manhattan, New York',
    price: '$1,850,000',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop',
    match: 92,
  },
  {
    id: 3,
    title: 'Coastal Beach House',
    location: 'Malibu, California',
    price: '$4,500,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    match: 88,
  }
];

export const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
  "Nashville, TN"
];
