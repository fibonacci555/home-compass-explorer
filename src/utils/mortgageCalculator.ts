
/**
 * Calculate monthly mortgage payment
 * 
 * @param propertyPrice - Total property price
 * @param downPayment - Initial down payment
 * @param interestRate - Annual interest rate (percentage)
 * @param loanTermYears - Loan term in years
 * @returns Monthly payment amount
 */
export function calculateMortgage(
  propertyPrice: number,
  downPayment: number,
  interestRate: number,
  loanTermYears: number
): number {
  const principal = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  // Handle edge case of 0% interest rate
  if (monthlyRate === 0) {
    return principal / totalPayments;
  }

  const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
  const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
  return principal * (numerator / denominator);
}

/**
 * Format currency amounts
 * 
 * @param num - Number to format
 * @returns Formatted currency string
 */
export function formatCurrency(
  num: number, 
  maximumFractionDigits: number = 0
): string {
  return num.toLocaleString('en-US', {
    style: 'currency' as const,
    currency: 'USD',
    maximumFractionDigits
  });
}
