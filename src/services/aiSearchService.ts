
import { properties } from '@/data/properties';

// Simple AI search function that simulates AI capabilities
export const aiSearch = (query: string) => {
  // Convert query to lowercase for case-insensitive matching
  const searchQuery = query.toLowerCase().trim();
  
  // Parse for patterns like "T2" (2 bedrooms) or specific locations
  const bedroomMatch = searchQuery.match(/t(\d+)/i);
  const numBedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : null;
  
  // Extract location terms
  const locationTerms = searchQuery
    .replace(/t\d+/i, '')
    .split(' ')
    .filter(term => term.length > 1);
  
  // Find exact matches based on search criteria
  const exactMatches = properties.filter(property => {
    // Match bedrooms if specified in query
    const bedroomMatch = numBedrooms ? property.bedrooms === numBedrooms : true;
    
    // Match location if specified in query
    const locationMatch = locationTerms.length > 0 
      ? locationTerms.some(term => 
          property.location.toLowerCase().includes(term)
        )
      : true;
    
    // Match title or description
    const titleMatch = property.title.toLowerCase().includes(searchQuery);
    const descriptionMatch = property.description?.toLowerCase().includes(searchQuery) || false;
    
    // Calculate price range from query (e.g., "under 1M" or "500k to 800k")
    const priceMatch = true; // Simplified for now
    
    // For exact matches, require most criteria to match
    return (bedroomMatch && locationMatch) || titleMatch || descriptionMatch;
  });
  
  // Find related/recommended properties (properties that might be of interest)
  const recommendedMatches = properties.filter(property => {
    // Don't include exact matches in recommendations
    if (exactMatches.some(match => match.id === property.id)) {
      return false;
    }
    
    // More lenient matching for recommendations
    const bedroomSimilar = numBedrooms 
      ? Math.abs(property.bedrooms - numBedrooms) <= 1 
      : true;
    
    const locationSimilar = locationTerms.length > 0
      ? locationTerms.some(term => 
          property.location.toLowerCase().includes(term) ||
          property.title.toLowerCase().includes(term)
        )
      : true;
      
    // For similar properties, use more relaxed criteria
    return bedroomSimilar || locationSimilar;
  });
  
  return {
    exactMatches: exactMatches.slice(0, 6),  // Limit to 6 results
    recommendedMatches: recommendedMatches.slice(0, 4)  // Limit to 4 results
  };
};
