
import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import PropertiesCarouselSection from '../components/home/PropertiesCarouselSection';
import MortgageCalculatorSection from '../components/home/MortgageCalculatorSection';
import Footer from '../components/home/Footer';
import { useTheme } from '../components/ThemeContext';

// Main Component
export default function Index() {
  const { theme } = useTheme();

  // Animation refs for sections
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const mortgageRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const carouselInView = useInView(carouselRef, { once: true, margin: '-100px' });
  const mortgageInView = useInView(mortgageRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <HeroSection heroRef={heroRef} heroInView={heroInView} />
      <PropertiesCarouselSection carouselRef={carouselRef} carouselInView={carouselInView} />
      <MortgageCalculatorSection mortgageRef={mortgageRef} mortgageInView={mortgageInView} />
      <Footer />
    </div>
  );
}
