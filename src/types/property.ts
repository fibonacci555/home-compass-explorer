
export interface Property {
  id: number;
  title: string;
  description?: string;
  price: string;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area?: string;
  features?: string[];
  type?: string;
  status?: string;
  listedDate?: string;
  latitude?: number;
  longitude?: number;
}
