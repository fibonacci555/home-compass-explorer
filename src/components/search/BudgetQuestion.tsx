
import React from 'react';

interface BudgetQuestionProps {
  budget: number;
  setBudget: (budget: number) => void;
}

export default function BudgetQuestion({ budget, setBudget }: BudgetQuestionProps) {
  return (
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
  );
}
