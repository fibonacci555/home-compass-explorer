
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import { WorldMap } from '../ui/world-map';
import InteractiveSearch from '../InteractiveSearch';

// Map connection data
const mapDots = [
  {
    start: { lat: 40.7128, lng: -74.0060, label: "New York" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  },
  {
    start: { lat: 64.2008, lng: -149.4937, label: "Alaska" },
    end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  },
  {
    start: { lat: 64.2008, lng: -149.4937 },
    end: { lat: -15.7975, lng: -47.8919, label: "Brazil" },
  },
  {
    start: { lat: -15.7975, lng: -47.8919 },
    end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok" },
  },
  {
    start: { lat: 28.6139, lng: 77.209 },
    end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
  },
  {
    start: { lat: 40.7128, lng: -74.0060 },
    end: { lat: 48.8566, lng: 2.3522, label: "Paris" },
  },
  {
    start: { lat: 35.6762, lng: 139.6503 },
    end: { lat: -33.8688, lng: 151.2093 },
  },
  {
    start: { lat: -33.8688, lng: 151.2093 },
    end: { lat: -41.2865, lng: 174.7762, label: "Wellington" },
  },
  {
    start: { lat: 55.7558, lng: 37.6173, label: "Moscow" },
    end: { lat: 39.9042, lng: 116.4074, label: "Beijing" },
  },
  {
    start: { lat: 39.9042, lng: 116.4074 },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  },
];

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroInView: boolean;
}

export default function HeroSection({ heroRef, heroInView }: HeroSectionProps) {
  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={heroInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background Gradient with Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(239, 246, 255, 0.8) 0%, rgba(243, 232, 255, 0.8) 50%, rgba(254, 242, 242, 0.8) 100%)",
            "linear-gradient(135deg, rgba(243, 232, 255, 0.8) 0%, rgba(254, 242, 242, 0.8) 50%, rgba(239, 246, 255, 0.8) 100%)",
            "linear-gradient(135deg, rgba(254, 242, 242, 0.8) 0%, rgba(239, 246, 255, 0.8) 50%, rgba(243, 232, 255, 0.8) 100%)",
            "linear-gradient(135deg, rgba(239, 246, 255, 0.8) 0%, rgba(243, 232, 255, 0.8) 50%, rgba(254, 242, 242, 0.8) 100%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      >
        {/* Dark mode gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/0 via-purple-950/0 to-pink-950/0 dark:from-blue-950/80 dark:via-purple-950/80 dark:to-pink-950/80 transition-colors duration-1000"></div>
      </motion.div>

      {/* Animated MAP Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={heroInView ? { scale: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <WorldMap
          dots={mapDots}
          lineColor="#3b82f6"
        />
      </motion.div>

      {/* Animated Background Pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full z-0"
        style={{ width: "150%", height: "150%", top: "-25%", left: "-25%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 px-4 text-center max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Find Your Perfect Home
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore curated global listings and find your ideal property with our premium search experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <InteractiveSearch />
        </motion.div>
        
        {/* Sparkle Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400 dark:bg-blue-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-blue-600 dark:text-blue-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
    </motion.section>
  );
}
