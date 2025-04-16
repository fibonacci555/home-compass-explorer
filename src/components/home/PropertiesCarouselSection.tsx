
import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '../PropertyCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '@/data/properties';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertiesCarouselSectionProps {
  carouselRef: React.RefObject<HTMLDivElement>;
  carouselInView: boolean;
}

export default function PropertiesCarouselSection({ 
  carouselRef, 
  carouselInView 
}: PropertiesCarouselSectionProps) {
  return (
    <motion.section 
      ref={carouselRef}
      className="py-20 bg-white dark:bg-gray-900 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={carouselInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Properties
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our handpicked selection of premium properties from around the world
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={carouselInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {properties.map((prop, index) => (
                <CarouselItem key={prop.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <PropertyCard prop={prop} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </div>
          </Carousel>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-300">
            <Link to="/properties" className="flex items-center gap-2">
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
