
import React from 'react';
import Navbar from '@/components/Navbar';
import { WorldMap } from '@/components/ui/world-map';
import { motion } from 'framer-motion';
import { properties } from '@/data/properties';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, DollarSign, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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

const MapPage = () => {
  const [selectedProperty, setSelectedProperty] = React.useState<typeof properties[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Global Property Network</h2>
            <div className="h-[500px] relative">
              <WorldMap dots={propertyConnections} lineColor="#60a5fa" />
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Our properties span across the globe, connecting you to premium real estate opportunities worldwide.</p>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Featured Properties</h2>
              
              <div className="space-y-4">
                {properties.slice(0, 5).map((property) => (
                  <Card 
                    key={property.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div className="flex h-24">
                      <div className="w-24 h-full">
                        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
                      </div>
                      <CardContent className="py-2 px-3 flex-1">
                        <h3 className="font-semibold text-sm truncate">{property.title}</h3>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        <p className="text-blue-600 font-semibold text-sm mt-1">{property.price}</p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Button asChild className="w-full mt-4">
                <Link to="/properties">View All Properties</Link>
              </Button>
            </div>
            
            {selectedProperty && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Property Details</h2>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Info className="h-4 w-4" />
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
                  {selectedProperty.description}
                </p>
                
                <Button asChild className="w-full">
                  <Link to={`/properties/${selectedProperty.id}`}>
                    View Full Details
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
