import { Transaction } from '../types';
import { format, parseISO, startOfMonth, endOfMonth, subMonths } from 'date-fns';

// Get transactions for a specific month
export const getTransactionsByMonth = (
  transactions: Transaction[], 
  monthsAgo: number = 0
): Transaction[] => {
  const today = new Date();
  const targetMonth = subMonths(today, monthsAgo);
  const start = startOfMonth(targetMonth);
  const end = endOfMonth(targetMonth);
  
  return transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    return transactionDate >= start && transactionDate <= end;
  });
};

// Calculate total income for a given period
export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate total expenses for a given period
export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate savings for a given period
export const calculateSavings = (transactions: Transaction[]): number => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

// Group transactions by category and calculate totals
export const getExpensesByCategory = (transactions: Transaction[]): Record<string, number> => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  return expenseTransactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

// Format date
export const formatDate = (dateString: string, formatStr: string = 'MMM d, yyyy'): string => {
  return format(parseISO(dateString), formatStr);
};

// Calculate spending trend (percentage change)
export const calculateSpendingTrend = (
  currentMonthTransactions: Transaction[],
  previousMonthTransactions: Transaction[]
): number => {
  const currentExpenses = calculateTotalExpenses(currentMonthTransactions);
  const previousExpenses = calculateTotalExpenses(previousMonthTransactions);
  
  if (previousExpenses === 0) return 0;
  
  return (currentExpenses - previousExpenses) / previousExpenses;
};

// Prepare data for the spending vs income chart
export const prepareMonthlyComparisonData = (
  transactions: Transaction[],
  monthsToShow: number = 3
): Array<{ name: string; income: number; expenses: number; savings: number }> => {
  const data = [];
  
  for (let i = monthsToShow - 1; i >= 0; i--) {
    const monthTransactions = getTransactionsByMonth(transactions, i);
    const income = calculateTotalIncome(monthTransactions);
    const expenses = calculateTotalExpenses(monthTransactions);
    
    data.push({
      name: format(subMonths(new Date(), i), 'MMM'),
      income,
      expenses,
      savings: income - expenses
    });
  }
  
  return data;
};

// Convert list of transactions to data format needed for spending chart
export const prepareSpendingCategoryData = (transactions: Transaction[]): Array<{ name: string; value: number }> => {
  const expensesByCategory = getExpensesByCategory(transactions);
  
  return Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount
  }));
};