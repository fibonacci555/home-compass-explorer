
import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyCard from '../PropertyCard';

// Sample property data
const properties = [
  {
    id: 1,
    title: 'Modern Apartment',
    location: 'Downtown Manhattan',
    price: '$1,250,000',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    price: '$3,850,000',
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2187&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Cozy Mountain Retreat',
    location: 'Aspen, Colorado',
    price: '$1,975,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Penthouse with City View',
    location: 'Chicago, Illinois',
    price: '$2,600,000',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Historic Townhouse',
    location: 'Boston, Massachusetts',
    price: '$1,850,000',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop',
  },
];

interface PropertiesCarouselSectionProps {
  carouselRef: React.RefObject<HTMLDivElement>;
  carouselInView: boolean;
}

export default function PropertiesCarouselSection({ 
  carouselRef, 
  carouselInView 
}: PropertiesCarouselSectionProps) {
  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

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
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={carouselInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Slider {...sliderSettings}>
            {properties.map((prop) => (
              <div key={prop.id} className="px-3 py-2">
                <PropertyCard prop={prop} />
              </div>
            ))}
          </Slider>
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={carouselInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-300">
            View All Properties
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
