
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Most viewed properties data
const mostViewedProperties = [
  {
    id: 1,
    title: "Modern Apartment",
    location: "Downtown Manhattan",
    price: "$1,250,000",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop",
    views: 2845
  },
  {
    id: 2,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: "$3,850,000",
    image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2187&auto=format&fit=crop",
    views: 2463
  },
  {
    id: 3,
    title: "Cozy Mountain Retreat",
    location: "Aspen, Colorado",
    price: "$1,975,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    views: 2128
  },
  {
    id: 4,
    title: "Penthouse with City View",
    location: "Chicago, Illinois",
    price: "$2,600,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    views: 1975
  }
];

export default function MostViewedPropertiesSection({ featuresRef, featuresInView }: { featuresRef: React.RefObject<HTMLDivElement>, featuresInView: boolean }) {
  return (
    <motion.section
      ref={featuresRef}
      className="py-20 bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={featuresInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Most Viewed Properties
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Check out the properties that are catching everyone's attention
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" asChild>
              <Link to="/properties" className="flex items-center gap-2">
                View all properties <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostViewedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{property.views.toLocaleString()}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{property.location}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-bold">{property.price}</p>
                </CardContent>
                <CardFooter className="pt-0 px-4 pb-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/properties/${property.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
