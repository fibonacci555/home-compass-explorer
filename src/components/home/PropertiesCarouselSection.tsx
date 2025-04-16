
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  // Animation controls for smooth transitions
  const controls = useAnimation();
  
  // Reference for accessing the carousel API
  const emblaApiRef = useRef(null);
  
  // State to track if the user is hovering over the carousel
  const [isHovering, setIsHovering] = useState(false);
  
  // Start animation when the section comes into view
  useEffect(() => {
    if (carouselInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [carouselInView, controls]);

  return (
    <motion.section 
      ref={carouselRef}
      className="py-16 bg-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={carouselInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 py-2 px-6 inline-block rounded-lg bg-blue-600 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Featured Properties
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Explore our handpicked selection of premium properties from around the world
          </motion.p>
        </div>
        
        <motion.div 
          className="max-w-7xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={carouselInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
              containScroll: false,
            }}
            className="w-full"
            setApi={(api) => {
              emblaApiRef.current = api;
              
              // Setup auto-scrolling when API is available
              if (api) {
                const interval = setInterval(() => {
                  if (!isHovering && document.visibilityState === 'visible') {
                    api.scrollNext();
                  }
                }, 4000); // Slower scroll (4 seconds between slides)
                
                // Clean up interval on API change
                return () => clearInterval(interval);
              }
            }}
          >
            <CarouselContent>
              {/* Only use the original property array for cleaner scrolling */}
              {properties.map((prop) => (
                <CarouselItem key={prop.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Link to={`/properties/${prop.id}`}>
                      <PropertyCard prop={prop} />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-2 hover:bg-blue-100 transition-colors duration-200" />
              <CarouselNext className="right-2 hover:bg-blue-100 transition-colors duration-200" />
            </div>
          </Carousel>
        </motion.div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
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
