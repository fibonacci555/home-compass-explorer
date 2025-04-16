
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { WorldMap } from '@/components/ui/world-map';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '@/data/properties';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, DollarSign, Info, Navigation, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

// Create property connections for the world map
const propertyConnections = properties.map((property, index) => {
  // Create some artificial connections between properties
  const nextProperty = properties[(index + 1) % properties.length];
  
  return {
    start: { 
      lat: property.latitude, 
      lng: property.longitude,
      label: property.location
    },
    end: { 
      lat: nextProperty.latitude, 
      lng: nextProperty.longitude,
      label: nextProperty.location
    }
  };
});

// Group properties by region for easier navigation
const propertyRegions = [
  { name: "North America", properties: properties.filter(p => p.continent === "North America") },
  { name: "Europe", properties: properties.filter(p => p.continent === "Europe") },
  { name: "Asia", properties: properties.filter(p => p.continent === "Asia") },
  { name: "Oceania", properties: properties.filter(p => p.continent === "Oceania") },
  { name: "South America", properties: properties.filter(p => p.continent === "South America") },
  { name: "Africa", properties: properties.filter(p => p.continent === "Africa") },
];

const MapPage = () => {
  const [selectedProperty, setSelectedProperty] = React.useState<typeof properties[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);

  // Filter properties based on search query
  const filteredProperties = searchQuery 
    ? properties.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties.slice(0, 5);

  // Toggle region expansion
  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };

  // Jump to a region/continent on the map
  const jumpToRegion = (region: string) => {
    // In a real implementation, this would adjust the map view
    // For now, we'll just log it and expand the region
    console.log(`Jumping to ${region}`);
    if (!expandedRegions.includes(region)) {
      toggleRegion(region);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Global Property Network</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAnimationSpeed(prev => Math.max(0.2, prev - 0.1))}
                  className="text-xs px-2"
                >
                  Speed +
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAnimationSpeed(prev => Math.min(1.0, prev + 0.1))}
                  className="text-xs px-2"
                >
                  Speed -
                </Button>
              </div>
            </div>
            
            <div className="h-[550px] relative">
              <WorldMap 
                dots={propertyConnections} 
                lineColor="#60a5fa" 
                animationSpeed={animationSpeed}
              />
            </div>
            
            <div className="absolute top-16 right-6 z-10 flex flex-col gap-2">
              {propertyRegions.map(region => (
                <Button 
                  key={region.name}
                  size="sm"
                  variant="secondary"
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md border border-gray-200 dark:border-gray-700"
                  onClick={() => jumpToRegion(region.name)}
                >
                  <Navigation className="h-3 w-3 mr-1" />
                  {region.name}
                </Button>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Our properties span across the globe, connecting you to premium real estate opportunities worldwide.</p>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Browse by Region</h2>
              
              <div className="space-y-2 mb-4">
                {propertyRegions.map(region => (
                  <div key={region.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button 
                      className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      onClick={() => toggleRegion(region.name)}
                    >
                      <span className="font-medium">{region.name}</span>
                      <span className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{region.properties.length} properties</span>
                        {expandedRegions.includes(region.name) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                    
                    {expandedRegions.includes(region.name) && (
                      <div className="px-3 pb-3">
                        <ScrollArea className="h-[120px]">
                          <div className="space-y-2">
                            {region.properties.map(property => (
                              <div 
                                key={property.id}
                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                                onClick={() => setSelectedProperty(property)}
                              >
                                <MapPin className="h-3 w-3 text-blue-500" />
                                <span className="text-sm truncate">{property.location}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Featured Properties</h2>
              
              <div className="space-y-3">
                {filteredProperties.map((property) => (
                  <Card 
                    key={property.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex h-24">
                      <div className="w-24 h-full">
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                      </div>
                      <CardContent className="py-2 px-3 flex-1">
                        <h3 className="font-semibold text-sm truncate">{property.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-1">{property.price}</p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Button asChild className="w-full mt-4">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
            
            <AnimatePresence>
              {selectedProperty && (
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Property Details</h2>
                    <button 
                      onClick={() => setSelectedProperty(null)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={selectedProperty.image} 
                      alt={selectedProperty.title} 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  
                  <h3 className="font-bold text-lg">{selectedProperty.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedProperty.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Bedrooms</div>
                      <div className="font-semibold flex items-center">
                        <Home className="h-3 w-3 mr-1" />
                        {selectedProperty.bedrooms}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                      <div className="font-semibold flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {selectedProperty.price}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {selectedProperty.description || "Beautiful property with modern amenities in a prime location."}
                  </p>
                  
                  <Button asChild className="w-full">
                    <Link to={`/properties/${selectedProperty.id}`}>
                      View Full Details
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
