
import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import PropertiesCarouselSection from '../components/home/PropertiesCarouselSection';
import MostViewedPropertiesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/home/Footer';
import { InfiniteMovingCards } from '@/components/home/InfiniteMovingCards';

// Main Component
export default function Index() {
  // Animation refs for sections
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const carouselInView = useInView(carouselRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <HeroSection heroRef={heroRef} heroInView={heroInView} />
      <InfiniteMovingCards speed='slow' direction='right' />
      <MostViewedPropertiesSection featuresRef={featuresRef} featuresInView={featuresInView} />
      <TestimonialsSection testimonialsRef={testimonialsRef} testimonialsInView={testimonialsInView} />
      <Footer />
    </div>
  );
}
