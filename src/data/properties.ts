
import { SearchResult } from "@/types/search";

export interface Property extends SearchResult {
  latitude: number;
  longitude: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment",
    location: "Downtown Manhattan",
    price: "$1,250,000",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
    match: 96,
    latitude: 40.7128,
    longitude: -74.0060,
    description: "Luxurious modern apartment in the heart of Manhattan with stunning city views, high-end finishes, and exclusive building amenities.",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1250,
    yearBuilt: 2018
  },
  {
    id: 2,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: "$3,850,000",
    image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2187&auto=format&fit=crop",
    match: 92,
    latitude: 34.0259,
    longitude: -118.7798,
    description: "Breathtaking beachfront villa with private beach access, panoramic ocean views, and resort-style amenities throughout the property.",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 4500,
    yearBuilt: 2015
  },
  {
    id: 3,
    title: "Cozy Mountain Retreat",
    location: "Aspen, Colorado",
    price: "$1,975,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    match: 88,
    latitude: 39.1911,
    longitude: -106.8175,
    description: "Charming mountain retreat with rustic elegance, stone fireplace, and expansive deck overlooking the majestic Rocky Mountains.",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    yearBuilt: 2010
  },
  {
    id: 4,
    title: "Penthouse with City View",
    location: "Chicago, Illinois",
    price: "$2,600,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    match: 85,
    latitude: 41.8781,
    longitude: -87.6298,
    description: "Stunning penthouse in downtown Chicago featuring floor-to-ceiling windows, private terrace, and unparalleled views of the skyline.",
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3000,
    yearBuilt: 2017
  },
  {
    id: 5,
    title: "Historic Townhouse",
    location: "Boston, Massachusetts",
    price: "$1,850,000",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
    match: 82,
    latitude: 42.3601,
    longitude: -71.0589,
    description: "Beautifully restored historic townhouse with original architectural details, modern updates, and private garden in a prime location.",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    yearBuilt: 1890
  },
];
