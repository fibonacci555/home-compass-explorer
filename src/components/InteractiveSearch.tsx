import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Building, Heart, MapPin } from 'lucide-react';
import { SearchResult, PropertyType } from '@/types/search';
import { mockResults, locations } from '@/data/mockData';
import SearchBar from './search/SearchBar';
import QuestionCard from './search/QuestionCard';
import SimpleLocationDropdown from './search/SimpleLocationDropdown';
import BudgetQuestion from './search/BudgetQuestion';
import PropertyTypeQuestion from './search/PropertyTypeQuestion';
import BedroomsQuestion from './search/BedroomsQuestion';
import LoadingAnimation from './search/LoadingAnimation';
import SearchResults from './search/SearchResults';

export default function InteractiveSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [searchComplete, setSearchComplete] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [budget, setBudget] = useState<number>(1000000);
  const [propertyType, setPropertyType] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Ensure locations is defined and an array
  const locationsList = Array.isArray(locations) ? locations : [];
  
  const propertyTypes: PropertyType[] = [
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
        // Use SimpleLocationDropdown instead of LocationQuestion to avoid cmdk issues
        <SimpleLocationDropdown 
          selectedLocation={selectedLocation} 
          setSelectedLocation={setSelectedLocation} 
          locations={locationsList} 
        />
      ),
    },
    {
      id: 'budget',
      question: "What's your investment budget?",
      component: <BudgetQuestion budget={budget} setBudget={setBudget} />,
    },
    {
      id: 'property-type',
      question: 'What type of property are you interested in?',
      component: <PropertyTypeQuestion 
        propertyType={propertyType} 
        setPropertyType={setPropertyType} 
        propertyTypes={propertyTypes} 
      />,
    },
    {
      id: 'bedrooms',
      question: 'How many bedrooms do you need?',
      component: <BedroomsQuestion bedrooms={bedrooms} setBedrooms={setBedrooms} />,
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

  const resetSearch = () => {
    // Reset any previous search
    setSearchComplete(false);
    setShowResults(false);
    setSelectedResult(null);
    // Show the first question
    setCurrentStep(0);
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      setIsSearching(true);
      
      // Navigate to search results page
      setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setIsSearching(false);
      }, 500);
    } else {
      resetSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-10">
      {/* Standard Search Bar */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchClick={handleSearchClick}
        resetSearch={resetSearch}
        isSearching={isSearching}
      />

      {/* Interactive Question Flow */}
      <AnimatePresence>
        {!searchComplete && currentStep >= 0 && !isSearching && (
          <QuestionCard
            currentStep={currentStep}
            totalSteps={questions.length}
            questionTitle={questions[currentStep].question}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            isStepValid={isStepValid()}
          >
            {questions[currentStep].component}
          </QuestionCard>
        )}

        {/* Loading Animation */}
        {searchComplete && !showResults && <LoadingAnimation />}

        {/* Search Results */}
        {showResults && selectedResult && <SearchResults selectedResult={selectedResult} />}
      </AnimatePresence>
    </div>
  );
}
