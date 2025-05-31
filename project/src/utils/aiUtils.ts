import Fuse from 'fuse.js';
import { Transaction, Goal, Bill, AIInsight } from '../types';
import { 
  formatCurrency, 
  calculateTotalExpenses,
  getTransactionsByMonth,
  getExpensesByCategory
} from './financialUtils';
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

// Fuzzy search options
const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: ['keywords']
};

interface ContextualResponse {
  keywords: string[];
  getResponse: (context: AIContext) => string;
}

interface AIContext {
  transactions: Transaction[];
  goals: Goal[];
  bills: Bill[];
  insights: AIInsight[];
  user: {
    name: string;
  };
}

// Enhanced contextual responses
export const contextualResponses: ContextualResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey'],
    getResponse: (context) => {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
      return `${greeting} ${context.user.name}! I'm your AI financial assistant. How can I help you today?`;
    }
  },
  {
    keywords: ['spend', 'spent', 'spending', 'expenses'],
    getResponse: (context) => {
      const currentMonth = getTransactionsByMonth(context.transactions, 0);
      const lastMonth = getTransactionsByMonth(context.transactions, 1);
      
      const currentExpenses = calculateTotalExpenses(currentMonth);
      const lastExpenses = calculateTotalExpenses(lastMonth);
      
      const percentChange = ((currentExpenses - lastExpenses) / lastExpenses) * 100;
      const trend = percentChange > 0 ? 'up' : 'down';
      
      const categories = getExpensesByCategory(currentMonth);
      const topCategory = Object.entries(categories)
        .sort(([,a], [,b]) => b - a)[0];
      
      return `This month, you've spent ${formatCurrency(currentExpenses)}, which is ${Math.abs(percentChange).toFixed(1)}% ${trend} from last month. Your highest spending category is ${topCategory[0]} at ${formatCurrency(topCategory[1])}.`;
    }
  },
  {
    keywords: ['save', 'saving', 'savings'],
    getResponse: (context) => {
      const currentMonth = getTransactionsByMonth(context.transactions, 0);
      const income = currentMonth
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = calculateTotalExpenses(currentMonth);
      const savings = income - expenses;
      const savingsRate = (savings / income) * 100;
      
      const emergencyFund = context.goals.find(g => g.name === 'Emergency Fund');
      let emergencyFundStatus = '';
      if (emergencyFund) {
        const progress = (emergencyFund.currentAmount / emergencyFund.targetAmount) * 100;
        emergencyFundStatus = `\n\nYour emergency fund is ${progress.toFixed(1)}% funded at ${formatCurrency(emergencyFund.currentAmount)}.`;
      }
      
      return `Your current monthly savings rate is ${savingsRate.toFixed(1)}%. You've saved ${formatCurrency(savings)} this month.${emergencyFundStatus}`;
    }
  },
  {
    keywords: ['goal', 'goals', 'target'],
    getResponse: (context) => {
      if (context.goals.length === 0) {
        return "You haven't set any savings goals yet. Would you like to create one?";
      }
      
      const goalSummaries = context.goals.map(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const remaining = goal.targetAmount - goal.currentAmount;
        return `${goal.name}: ${progress.toFixed(1)}% funded (${formatCurrency(remaining)} to go)`;
      });
      
      return `Here's your progress on savings goals:\n\n${goalSummaries.join('\n')}`;
    }
  },
  {
    keywords: ['bill', 'bills', 'payment', 'due'],
    getResponse: (context) => {
      const upcomingBills = context.bills
        .filter(bill => !bill.isPaid)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      
      if (upcomingBills.length === 0) {
        return "You don't have any upcoming bills due.";
      }
      
      const nextBills = upcomingBills.slice(0, 3).map(bill => 
        `${bill.name}: ${formatCurrency(bill.amount)} due on ${format(new Date(bill.dueDate), 'MMM d')}`
      );
      
      const totalDue = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0);
      
      return `You have ${upcomingBills.length} upcoming bills totaling ${formatCurrency(totalDue)}. Here are your next payments:\n\n${nextBills.join('\n')}`;
    }
  },
  {
    keywords: ['category', 'categories'],
    getResponse: (context) => {
      const currentMonth = getTransactionsByMonth(context.transactions, 0);
      const categories = getExpensesByCategory(currentMonth);
      
      const categoryBreakdown = Object.entries(categories)
        .sort(([,a], [,b]) => b - a)
        .map(([category, amount]) => `${category}: ${formatCurrency(amount)}`)
        .slice(0, 5);
      
      return `Here's your top spending categories this month:\n\n${categoryBreakdown.join('\n')}`;
    }
  },
  {
    keywords: ['trend', 'trends', 'pattern', 'patterns'],
    getResponse: (context) => {
      const months = Array.from({ length: 3 }, (_, i) => getTransactionsByMonth(context.transactions, i));
      const trends = months.map(month => ({
        month: format(startOfMonth(new Date(month[0]?.date || new Date())), 'MMMM'),
        expenses: calculateTotalExpenses(month)
      }));
      
      const trendSummary = trends.map(t => `${t.month}: ${formatCurrency(t.expenses)}`);
      
      return `Here's your spending trend over the last 3 months:\n\n${trendSummary.join('\n')}`;
    }
  }
];

// Get AI response based on user input and context
export const getAIResponse = (message: string, context: AIContext): string => {
  const fuse = new Fuse(contextualResponses, fuseOptions);
  const results = fuse.search(message);
  
  if (results.length > 0) {
    return results[0].item.getResponse(context);
  }
  
  // Default response if no match found
  return `I understand you're asking about "${message}". While I'm not sure about the specific details, I can help you with:\n\n- Spending analysis\n- Savings goals\n- Bill payments\n- Budget trends\n\nWhat would you like to know about these topics?`;
};

// Generate AI insights based on financial data
export const generateInsights = (context: AIContext): AIInsight[] => {
  const insights: AIInsight[] = [];
  const currentMonth = getTransactionsByMonth(context.transactions, 0);
  const lastMonth = getTransactionsByMonth(context.transactions, 1);
  
  // Spending trend insight
  const currentExpenses = calculateTotalExpenses(currentMonth);
  const lastExpenses = calculateTotalExpenses(lastMonth);
  const spendingChange = ((currentExpenses - lastExpenses) / lastExpenses) * 100;
  
  if (Math.abs(spendingChange) > 10) {
    insights.push({
      id: '1',
      title: `${spendingChange > 0 ? 'Increased' : 'Decreased'} Spending Detected`,
      description: `Your spending is ${Math.abs(spendingChange).toFixed(1)}% ${spendingChange > 0 ? 'higher' : 'lower'} than last month. ${
        spendingChange > 0 ? 'Consider reviewing your expenses.' : 'Great job on reducing expenses!'
      }`,
      type: spendingChange > 0 ? 'warning' : 'success',
      actionable: spendingChange > 0
    });
  }
  
  // Category-specific insights
  const currentCategories = getExpensesByCategory(currentMonth);
  const lastCategories = getExpensesByCategory(lastMonth);
  
  Object.entries(currentCategories).forEach(([category, amount]) => {
    const lastAmount = lastCategories[category] || 0;
    const categoryChange = ((amount - lastAmount) / lastAmount) * 100;
    
    if (categoryChange > 20) {
      insights.push({
        id: crypto.randomUUID(),
        title: `High ${category} Spending`,
        description: `Your ${category} spending increased by ${categoryChange.toFixed(1)}% compared to last month.`,
        type: 'warning',
        category,
        actionable: true,
        action: {
          text: `Review ${category} expenses`
        }
      });
    }
  });
  
  // Goals progress insights
  context.goals.forEach(goal => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    
    if (progress >= 90) {
      insights.push({
        id: crypto.randomUUID(),
        title: `${goal.name} Almost Complete!`,
        description: `You're ${progress.toFixed(1)}% of the way to your ${goal.name} goal. Just ${formatCurrency(goal.targetAmount - goal.currentAmount)} to go!`,
        type: 'success',
        actionable: false
      });
    }
  });
  
  // Bill payment insights
  const upcomingBills = context.bills
    .filter(bill => !bill.isPaid)
    .filter(bill => {
      const dueDate = new Date(bill.dueDate);
      const today = new Date();
      const threeDaysFromNow = new Date(today.setDate(today.getDate() + 3));
      
      return isWithinInterval(dueDate, {
        start: today,
        end: threeDaysFromNow
      });
    });
  
  if (upcomingBills.length > 0) {
    insights.push({
      id: crypto.randomUUID(),
      title: 'Upcoming Bill Payments',
      description: `You have ${upcomingBills.length} bills due in the next 3 days, totaling ${formatCurrency(
        upcomingBills.reduce((sum, bill) => sum + bill.amount, 0)
      )}.`,
      type: 'warning',
      actionable: true,
      action: {
        text: 'View bills'
      }
    });
  }
  
  return insights;
};