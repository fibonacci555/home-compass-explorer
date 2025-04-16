
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Property } from "@/types/property";

interface PropertyCardProps {
  prop: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = React.memo(({ prop }) => (
  <motion.div
    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg mx-2 overflow-hidden border border-gray-100"
    whileHover={{ 
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
    transition={{ 
      duration: 0.3,
      ease: "easeOut"
    }}
  >
    <Link to={`/properties/${prop.id}`} className="block">
      <div className="relative">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{prop.title}</h3>
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-gray-600">{prop.location}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-bold text-lg">{prop.price}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </Link>
  </motion.div>
));

export default PropertyCard;
