
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyListItemProps {
  property: any;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          {property.match}% Match
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{property.title}</h3>
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
          <p className="text-gray-600 dark:text-gray-300 text-sm">{property.location}</p>
        </div>
        
        <div className="flex justify-between mb-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{property.price}</p>
          <Button asChild>
            <Link to={`/properties/${property.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyListItem;
