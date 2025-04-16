
export interface Property {
  id: number;
  title: string;
  description?: string;
  price: string;
  location: string;
  image: string;
  match?: number;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  yearBuilt?: number;
  continent?: string;
  features?: string[];
  listedDate?: string;
}
