
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  currentStep: number;
  totalSteps: number;
  questionTitle: string;
  children: React.ReactNode;
  handleNext: () => void;
  handlePrevious: () => void;
  isStepValid: boolean;
}

export default function QuestionCard({
  currentStep,
  totalSteps,
  questionTitle,
  children,
  handleNext,
  handlePrevious,
  isStepValid
}: QuestionCardProps) {
  return (
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
            {questionTitle}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        
        <div className="py-3">{children}</div>
        
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
            disabled={!isStepValid}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            {currentStep === totalSteps - 1 ? 'Search' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
