
export interface SearchResult {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  match: number;
}

export interface PropertyType {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}
