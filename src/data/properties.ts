
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
  {
    id: 6,
    title: "Lakefront Cottage",
    location: "Lake Tahoe, Nevada",
    price: "$1,350,000",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
    match: 79,
    latitude: 39.0968,
    longitude: -120.0324,
    description: "Charming lakefront cottage with private dock, stone fireplace, and stunning views of Lake Tahoe and the surrounding mountains.",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    yearBuilt: 2005
  },
  {
    id: 7,
    title: "Modern Glass House",
    location: "Seattle, Washington",
    price: "$2,250,000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    match: 76,
    latitude: 47.6062,
    longitude: -122.3321,
    description: "Architectural masterpiece with floor-to-ceiling glass walls, minimalist design, and seamless indoor-outdoor living spaces.",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3200,
    yearBuilt: 2020
  },
  {
    id: 8,
    title: "Urban Loft",
    location: "Brooklyn, New York",
    price: "$1,450,000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
    match: 74,
    latitude: 40.6782,
    longitude: -73.9442,
    description: "Converted warehouse loft featuring exposed brick walls, soaring ceilings, and industrial-chic design in a trendy Brooklyn neighborhood.",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    yearBuilt: 1920
  },
  {
    id: 9,
    title: "Mediterranean Villa",
    location: "Palm Beach, Florida",
    price: "$4,200,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    match: 71,
    latitude: 26.7056,
    longitude: -80.0364,
    description: "Elegant Mediterranean-style villa with private pool, lush gardens, and sophisticated interiors just minutes from the beach.",
    bedrooms: 5,
    bathrooms: 5.5,
    sqft: 4800,
    yearBuilt: 2012
  },
  {
    id: 10,
    title: "Desert Oasis",
    location: "Scottsdale, Arizona",
    price: "$2,785,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    match: 68,
    latitude: 33.4942,
    longitude: -111.9261,
    description: "Contemporary desert home with infinity pool, outdoor living spaces, and panoramic mountain views in an exclusive gated community.",
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 3600,
    yearBuilt: 2019
  },
  {
    id: 11,
    title: "Colonial Estate",
    location: "Greenwich, Connecticut",
    price: "$3,950,000",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop",
    match: 65,
    latitude: 41.0262,
    longitude: -73.6282,
    description: "Stately colonial estate set on manicured grounds with tennis court, pool, and classical architectural details throughout.",
    bedrooms: 6,
    bathrooms: 5.5,
    sqft: 5200,
    yearBuilt: 1955
  },
  {
    id: 12,
    title: "Waterfront Residence",
    location: "Newport, Rhode Island",
    price: "$5,750,000",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop",
    match: 62,
    latitude: 41.4901,
    longitude: -71.3128,
    description: "Historic waterfront mansion with private dock, original architectural details, and breathtaking ocean views from every room.",
    bedrooms: 7,
    bathrooms: 6.5,
    sqft: 6100,
    yearBuilt: 1895
  }
];
