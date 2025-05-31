import { Transaction, Category, Goal, Bill, AIInsight } from '../types';
import { format, subDays, addDays } from 'date-fns';

// Helper to create dates relative to today
const getDate = (dayOffset: number) => format(
  dayOffset < 0 ? subDays(new Date(), Math.abs(dayOffset)) : addDays(new Date(), dayOffset),
  'yyyy-MM-dd'
);

// Categories
export const categories: Category[] = [
  { id: '1', name: 'Housing', color: '#4338ca', icon: 'home' },
  { id: '2', name: 'Food', color: '#16a34a', icon: 'utensils' },
  { id: '3', name: 'Transportation', color: '#2563eb', icon: 'car' },
  { id: '4', name: 'Entertainment', color: '#9333ea', icon: 'film' },
  { id: '5', name: 'Shopping', color: '#db2777', icon: 'shopping-bag' },
  { id: '6', name: 'Healthcare', color: '#dc2626', icon: 'heart-pulse' },
  { id: '7', name: 'Education', color: '#ea580c', icon: 'graduation-cap' },
  { id: '8', name: 'Salary', color: '#059669', icon: 'briefcase' },
  { id: '9', name: 'Investments', color: '#0284c7', icon: 'trending-up' },
  { id: '10', name: 'Other', color: '#6b7280', icon: 'package' },
];

// Three months of transactions
export const transactions: Transaction[] = [
  // Current month transactions
  { id: '101', date: getDate(-2), description: 'Grocery Store', amount: 78.32, category: 'Food', type: 'expense' },
  { id: '102', date: getDate(-4), description: 'Monthly Rent', amount: 1200, category: 'Housing', type: 'expense' },
  { id: '103', date: getDate(-5), description: 'Gas Station', amount: 45.67, category: 'Transportation', type: 'expense' },
  { id: '104', date: getDate(-7), description: 'Movie Tickets', amount: 24.99, category: 'Entertainment', type: 'expense' },
  { id: '105', date: getDate(-10), description: 'Online Shopping', amount: 89.99, category: 'Shopping', type: 'expense' },
  { id: '106', date: getDate(-12), description: 'Doctor Visit', amount: 40, category: 'Healthcare', type: 'expense' },
  { id: '107', date: getDate(-14), description: 'Online Course', amount: 199.99, category: 'Education', type: 'expense' },
  { id: '108', date: getDate(-1), description: 'Monthly Salary', amount: 3500, category: 'Salary', type: 'income' },
  { id: '109', date: getDate(-15), description: 'Dividend Payment', amount: 125.75, category: 'Investments', type: 'income' },
  { id: '110', date: getDate(-18), description: 'Restaurant Dinner', amount: 65.43, category: 'Food', type: 'expense' },
  { id: '111', date: getDate(-20), description: 'Uber Ride', amount: 23.45, category: 'Transportation', type: 'expense' },
  { id: '112', date: getDate(-22), description: 'Streaming Service', amount: 14.99, category: 'Entertainment', type: 'expense' },
  { id: '113', date: getDate(-25), description: 'Phone Bill', amount: 85, category: 'Housing', type: 'expense' },
  { id: '114', date: getDate(-28), description: 'Internet Bill', amount: 65, category: 'Housing', type: 'expense' },
  
  // Previous month transactions
  { id: '201', date: getDate(-32), description: 'Grocery Store', amount: 82.45, category: 'Food', type: 'expense' },
  { id: '202', date: getDate(-34), description: 'Monthly Rent', amount: 1200, category: 'Housing', type: 'expense' },
  { id: '203', date: getDate(-35), description: 'Gas Station', amount: 48.75, category: 'Transportation', type: 'expense' },
  { id: '204', date: getDate(-37), description: 'Concert Tickets', amount: 150, category: 'Entertainment', type: 'expense' },
  { id: '205', date: getDate(-40), description: 'Clothing Store', amount: 120.50, category: 'Shopping', type: 'expense' },
  { id: '206', date: getDate(-42), description: 'Pharmacy', amount: 35.67, category: 'Healthcare', type: 'expense' },
  { id: '207', date: getDate(-44), description: 'Books', amount: 45.99, category: 'Education', type: 'expense' },
  { id: '208', date: getDate(-31), description: 'Monthly Salary', amount: 3500, category: 'Salary', type: 'income' },
  { id: '209', date: getDate(-45), description: 'Dividend Payment', amount: 130.25, category: 'Investments', type: 'income' },
  { id: '210', date: getDate(-48), description: 'Lunch', amount: 22.50, category: 'Food', type: 'expense' },
  { id: '211', date: getDate(-50), description: 'Public Transport', amount: 35, category: 'Transportation', type: 'expense' },
  { id: '212', date: getDate(-52), description: 'Movie Subscription', amount: 14.99, category: 'Entertainment', type: 'expense' },
  { id: '213', date: getDate(-55), description: 'Electricity Bill', amount: 95, category: 'Housing', type: 'expense' },
  { id: '214', date: getDate(-58), description: 'Water Bill', amount: 45, category: 'Housing', type: 'expense' },
  
  // Two months ago transactions
  { id: '301', date: getDate(-62), description: 'Grocery Store', amount: 75.25, category: 'Food', type: 'expense' },
  { id: '302', date: getDate(-64), description: 'Monthly Rent', amount: 1200, category: 'Housing', type: 'expense' },
  { id: '303', date: getDate(-65), description: 'Gas Station', amount: 42.50, category: 'Transportation', type: 'expense' },
  { id: '304', date: getDate(-67), description: 'Game Purchase', amount: 59.99, category: 'Entertainment', type: 'expense' },
  { id: '305', date: getDate(-70), description: 'Electronics Store', amount: 250, category: 'Shopping', type: 'expense' },
  { id: '306', date: getDate(-72), description: 'Dental Checkup', amount: 120, category: 'Healthcare', type: 'expense' },
  { id: '307', date: getDate(-74), description: 'Online Workshop', amount: 75, category: 'Education', type: 'expense' },
  { id: '308', date: getDate(-61), description: 'Monthly Salary', amount: 3500, category: 'Salary', type: 'income' },
  { id: '309', date: getDate(-75), description: 'Interest Income', amount: 25.50, category: 'Investments', type: 'income' },
  { id: '310', date: getDate(-78), description: 'Restaurant', amount: 55.75, category: 'Food', type: 'expense' },
  { id: '311', date: getDate(-80), description: 'Car Service', amount: 150, category: 'Transportation', type: 'expense' },
  { id: '312', date: getDate(-82), description: 'Concert', amount: 85, category: 'Entertainment', type: 'expense' },
  { id: '313', date: getDate(-85), description: 'Phone Bill', amount: 85, category: 'Housing', type: 'expense' },
  { id: '314', date: getDate(-88), description: 'Internet Bill', amount: 65, category: 'Housing', type: 'expense' }
];

// Sample financial goals
export const goals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 5500,
    endDate: getDate(180),
    color: '#0284c7'
  },
  {
    id: '2',
    name: 'Vacation',
    targetAmount: 2500,
    currentAmount: 1200,
    endDate: getDate(90),
    color: '#16a34a'
  },
  {
    id: '3',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 800,
    endDate: getDate(60),
    color: '#9333ea'
  }
];

// Sample upcoming bills
export const bills: Bill[] = [
  {
    id: '1',
    name: 'Rent',
    amount: 1200,
    dueDate: getDate(12),
    isPaid: false,
    recurrence: 'monthly'
  },
  {
    id: '2',
    name: 'Electricity',
    amount: 95,
    dueDate: getDate(5),
    isPaid: false,
    recurrence: 'monthly'
  },
  {
    id: '3',
    name: 'Internet',
    amount: 65,
    dueDate: getDate(8),
    isPaid: false,
    recurrence: 'monthly'
  },
  {
    id: '4',
    name: 'Phone Bill',
    amount: 85,
    dueDate: getDate(15),
    isPaid: false,
    recurrence: 'monthly'
  },
  {
    id: '5',
    name: 'Car Insurance',
    amount: 150,
    dueDate: getDate(20),
    isPaid: false,
    recurrence: 'quarterly'
  }
];

// Sample AI insights
export const insights: AIInsight[] = [
  {
    id: '1',
    title: 'Unusual spending detected',
    description: 'Your entertainment spending is 23% higher than your monthly average. This might impact your vacation savings goal.',
    type: 'warning',
    category: 'Entertainment',
    relatedTransactions: ['204', '304'],
    actionable: true,
    action: {
      text: 'View entertainment transactions'
    }
  },
  {
    id: '2',
    title: 'Savings opportunity',
    description: 'Based on your spending patterns, you could save $150 monthly by reducing restaurant expenses.',
    type: 'info',
    category: 'Food',
    relatedTransactions: ['110', '210', '310'],
    actionable: true,
    action: {
      text: 'View dining expenses'
    }
  },
  {
    id: '3',
    title: 'Bill payment reminder',
    description: 'Your electricity bill is due in 5 days. Set up automatic payments to avoid late fees.',
    type: 'warning',
    actionable: true,
    action: {
      text: 'Set up automatic payment'
    }
  },
  {
    id: '4',
    title: 'Goal progress',
    description: 'Great job! You\'ve reached 55% of your emergency fund goal. Keep it up!',
    type: 'success',
    actionable: false
  }
];

// Get monthly total for income, expenses, and savings
export const monthlyTotals = {
  income: 3625.75,  // Sum of income transactions for current month
  expenses: 1932.79,  // Sum of expense transactions for current month
  savings: 1692.96   // income - expenses
};

// Calculate financial health score (example algorithm)
export const calculateFinancialHealthScore = (): number => {
  // Sample factors in health score calculation
  const savingsRate = monthlyTotals.savings / monthlyTotals.income; // Higher is better
  const emergencyFundProgress = goals.find(g => g.name === 'Emergency Fund')?.currentAmount || 0 / 10000; // Progress toward 3-6 month emergency fund
  const debtToIncomeRatio = 0.25; // Lower is better (sample value for demo)
  const billPaymentHistory = 0.95; // Percentage of bills paid on time (sample value)
  
  // Weighted score calculation
  const score = (
    (savingsRate * 25) +
    (emergencyFundProgress * 25) +
    ((1 - debtToIncomeRatio) * 25) +
    (billPaymentHistory * 25)
  );
  
  // Ensure score is between 0-100
  return Math.min(Math.max(Math.round(score), 0), 100);
};

// AI chat predefined responses
interface ChatResponse {
  keywords: string[];
  response: string;
}

export const chatResponses: ChatResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello! I'm FinanceAI, your personal finance assistant. How can I help you today?"
  },
  {
    keywords: ['spend', 'grocery', 'groceries', 'food'],
    response: "You've spent $78.32 on groceries this month, which is 4.5% less than last month. Your total food spending (including restaurants) is $143.75."
  },
  {
    keywords: ['rent', 'housing'],
    response: "Your monthly rent payment of $1,200 is due in 12 days. This represents 33.1% of your monthly income, which is within the recommended range of 30-35%."
  },
  {
    keywords: ['save', 'saving', 'savings'],
    response: "You're currently saving $1,692.96 per month (46.7% of your income). Great job! This is well above the recommended 20% savings rate."
  },
  {
    keywords: ['goal', 'goals', 'vacation', 'emergency'],
    response: "You're making good progress on your goals. Your emergency fund is 55% complete, and your vacation fund is 48% complete. At your current savings rate, you'll reach your vacation goal 2 weeks ahead of schedule."
  },
  {
    keywords: ['invest', 'investment', 'investments'],
    response: "You received $125.75 in investment income this month. Based on your financial profile, you could increase your investments by $300 monthly while maintaining a healthy emergency fund."
  },
  {
    keywords: ['bill', 'bills', 'payment'],
    response: "You have 5 upcoming bills totaling $1,595 due this month. Your electricity bill ($95) is due in 5 days, and your internet bill ($65) is due in 8 days."
  },
  {
    keywords: ['budget', 'budgeting'],
    response: "Based on your spending patterns, I recommend the following monthly budget: Housing: $1,350 (37%), Food: $400 (11%), Transportation: $250 (7%), Entertainment: $200 (5.5%), Savings: $1,400 (38.5%)."
  }
];

// Function to get AI response based on user input
export const getAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const response of chatResponses) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response.response;
    }
  }
  
  return "I don't have specific information about that yet. As your AI finance assistant, I can help with questions about your spending, savings, goals, and budgeting. What would you like to know about your finances?";
};