
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateMortgage, formatCurrency } from '../../utils/mortgageCalculator';

interface MortgageCalculatorSectionProps {
  mortgageRef: React.RefObject<HTMLDivElement>;
  mortgageInView: boolean;
}

export default function MortgageCalculatorSection({ 
  mortgageRef, 
  mortgageInView 
}: MortgageCalculatorSectionProps) {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(30);

  // Calculate mortgage details
  const monthlyPayment = calculateMortgage(propertyPrice, downPayment, interestRate, loanTerm);
  const totalPaid = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPaid - (propertyPrice - downPayment);

  return (
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
  );
}
