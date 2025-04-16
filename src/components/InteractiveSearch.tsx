
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, Home, DollarSign, Building, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

interface SearchResult {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  match: number;
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    location: 'Miami Beach, Florida',
    price: '$3,250,000',
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=2187&auto=format&fit=crop',
    match: 96,
  },
  {
    id: 2,
    title: 'Modern Downtown Loft',
    location: 'Manhattan, New York',
    price: '$1,850,000',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=2071&auto=format&fit=crop',
    match: 92,
  },
  {
    id: 3,
    title: 'Coastal Beach House',
    location: 'Malibu, California',
    price: '$4,500,000',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    match: 88,
  }
];

export default function InteractiveSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [searchComplete, setSearchComplete] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [budget, setBudget] = useState<number>(1000000);
  const [propertyType, setPropertyType] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Miami, FL",
    "San Francisco, CA",
    "Austin, TX",
    "Seattle, WA",
    "Denver, CO",
    "Boston, MA",
    "Nashville, TN"
  ];
  
  const propertyTypes = [
    { id: 'house', label: 'House', icon: Home },
    { id: 'apartment', label: 'Apartment', icon: Building },
    { id: 'condo', label: 'Condo', icon: Building },
    { id: 'luxury', label: 'Luxury', icon: Heart },
  ];

  const questions = [
    {
      id: 'location',
      question: 'Where are you looking to invest?',
      component: (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between text-left font-normal h-14 px-4 py-6 border-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
            >
              {selectedLocation || "Select a location..."}
              <MapPin className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search location..." />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-auto">
                {locations.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => {
                      setSelectedLocation(location);
                    }}
                    className="flex items-center gap-2 p-2"
                  >
                    <MapPin className="h-4 w-4" />
                    {location}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: 'budget',
      question: "What's your investment budget?",
      component: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400">
              {budget.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <input
            type="range"
            min={100000}
            max={10000000}
            step={50000}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>$100k</span>
            <span>$10M</span>
          </div>
        </div>
      ),
    },
    {
      id: 'property-type',
      question: 'What type of property are you interested in?',
      component: (
        <div className="grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Button
                key={type.id}
                variant={propertyType === type.id ? 'default' : 'outline'}
                className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                  propertyType === type.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:border-blue-700'
                }`}
                onClick={() => setPropertyType(type.id)}
              >
                <Icon className="h-6 w-6" />
                <span>{type.label}</span>
              </Button>
            );
          })}
        </div>
      ),
    },
    {
      id: 'bedrooms',
      question: 'How many bedrooms do you need?',
      component: (
        <div className="flex justify-between gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={bedrooms === num ? 'default' : 'outline'}
              className={`flex-1 h-14 text-xl ${
                bedrooms === num 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950/30 dark:hover:border-blue-700'
              }`}
              onClick={() => setBedrooms(num)}
            >
              {num}
            </Button>
          ))}
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle search completion
      setSearchComplete(true);
      setTimeout(() => {
        setSelectedResult(mockResults[0]);
        setShowResults(true);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    if (currentStep === 0 && !selectedLocation) return false;
    if (currentStep === 2 && !propertyType) return false;
    return true;
  };

  return (
    <div className="w-full max-w-xl mx-auto relative z-10">
      {/* Standard Search Bar */}
      <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-full px-6 py-4 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700 flex items-center">
        <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
        <input
          type="text"
          placeholder="Search city, address, or property type..."
          className="flex-1 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200 focus:outline-none font-medium transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => {
            // Reset any previous search
            setSearchComplete(false);
            setShowResults(false);
            setSelectedResult(null);
            // Show the first question
            setCurrentStep(0);
          }}
        />
        <Button 
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
          onClick={() => {
            if (searchQuery) {
              setSearchComplete(true);
              setTimeout(() => {
                setSelectedResult(mockResults[0]);
                setShowResults(true);
              }, 1500);
            } else {
              // Reset any previous search
              setSearchComplete(false);
              setShowResults(false);
              setSelectedResult(null);
              // Show the first question
              setCurrentStep(0);
            }
          }}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Interactive Question Flow */}
      <AnimatePresence>
        {!searchComplete && currentStep >= 0 && (
          <motion.div
            key="question-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 backdrop-blur-lg"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {questions[currentStep].question}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {questions.length}
                </span>
              </div>
              
              <div className="py-3">{questions[currentStep].component}</div>
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-4 py-2"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  {currentStep === questions.length - 1 ? 'Search' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading Animation */}
        {searchComplete && !showResults && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-8 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 border-t-4 border-blue-600 dark:border-blue-400 border-solid rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Finding your perfect match</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Analyzing properties based on your preferences...
            </p>
          </motion.div>
        )}

        {/* Search Results */}
        {showResults && selectedResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative">
              <img 
                src={selectedResult.image} 
                alt={selectedResult.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {selectedResult.match}% Match
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedResult.title}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedResult.location}</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {selectedResult.price}
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" className="flex-1 mr-2">
                  See Details
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Request Tour
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full mt-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                onClick={() => alert('Showing all 91 matching properties')}
              >
                View all 91 matching properties
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
