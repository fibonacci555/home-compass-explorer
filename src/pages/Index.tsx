import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { WorldMap } from '../components/ui/world-map';
import PropertyCard from '../components/PropertyCard';
import { calculateMortgage, formatCurrency } from '../utils/mortgageCalculator';
import { useTheme } from '../components/ThemeContext';
import InteractiveSearch from '../components/InteractiveSearch';

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

// Main Component
export default function Index() {
  const { theme } = useTheme();
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Calculate mortgage details
  const monthlyPayment = calculateMortgage(propertyPrice, downPayment, interestRate, loanTerm);
  const totalPaid = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPaid - (propertyPrice - downPayment);

  // Animation refs for sections
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const mortgageRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const carouselInView = useInView(carouselRef, { once: true, margin: '-100px' });
  const mortgageInView = useInView(mortgageRef, { once: true, margin: '-100px' });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* ================= HERO SECTION ================= */}
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
            lineColor={theme === 'dark' ? "#60a5fa" : "#3b82f6"}
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
            {/* Replace the old search bar with the new interactive search component */}
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

      {/* ================= PROPERTIES CAROUSEL ================= */}
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

      {/* ================= MORTGAGE CALCULATOR ================= */}
      <motion.section
        ref={mortgageRef}
        className="py-20 bg-gray-50 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={mortgageInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 md:p-10">
                <div className="text-center mb-10">
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={mortgageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Mortgage Calculator
                  </motion.h2>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={mortgageInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Estimate your monthly payments and see how much interest you'll pay over time
                  </motion.p>
                </div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={mortgageInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Left: Input Controls */}
                  <div className="space-y-8">
                    {/* Property Price */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="font-semibold text-gray-800 dark:text-gray-200">Property Price</label>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {formatCurrency(propertyPrice)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={5000000}
                        step={50000}
                        value={propertyPrice}
                        onChange={(e) => setPropertyPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>$100k</span>
                        <span>$5M</span>
                      </div>
                    </div>

                    {/* Down Payment */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="font-semibold text-gray-800 dark:text-gray-200">Down Payment</label>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {formatCurrency(downPayment)} ({Math.round((downPayment / propertyPrice) * 100)}%)
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={propertyPrice * 0.9}
                        step={10000}
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>0%</span>
                        <span>90%</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="font-semibold text-gray-800 dark:text-gray-200">Interest Rate</label>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {interestRate.toFixed(2)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.5}
                        max={10}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>0.5%</span>
                        <span>10%</span>
                      </div>
                    </div>

                    {/* Loan Term */}
                    <div>
                      <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">Loan Term (Years)</label>
                      <div className="flex space-x-4 mt-2">
                        {[15, 20, 30].map((term) => (
                          <button
                            key={term}
                            onClick={() => setLoanTerm(term)}
                            className={`flex-1 py-3 rounded-lg border-2 transition-all duration-300 ${
                              loanTerm === term
                                ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700'
                                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500'
                            }`}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Calculation Results */}
                  <div className="flex flex-col items-center justify-center space-y-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Monthly Payment</h3>
                      <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                        {formatCurrency(monthlyPayment || 0, 2)}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Principal &amp; Interest</p>
                    </div>
                    
                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Loan Amount</p>
                        <p className="text-blue-600 dark:text-blue-400 text-xl font-bold mt-1">
                          {formatCurrency(propertyPrice - downPayment)}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Total Interest</p>
                        <p className="text-red-500 dark:text-red-400 text-xl font-bold mt-1">
                          {formatCurrency(totalInterest > 0 ? totalInterest : 0)}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md text-center col-span-2">
                        <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Total Cost</p>
                        <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-1">
                          {formatCurrency(
                            (propertyPrice - downPayment) + (totalInterest > 0 ? totalInterest : 0)
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {/* Remove amortization button and replace with a premium action button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center"
                      onClick={() => alert('Request personalized mortgage consultation')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Get Pre-Approved Today
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* ================= FOOTER SECTION ================= */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Home Compass Explorer</h2>
            <p className="max-w-md mx-auto mb-8">
              Your trusted companion in finding the perfect home anywhere in the world.
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="hover:text-blue-400 transition-colors">
                  {social}
                </a>
              ))}
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Home Compass Explorer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
