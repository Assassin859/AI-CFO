import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Transaction, 
  Category, 
  Goal, 
  Bill, 
  AIInsight, 
  ChatMessage,
  User 
} from '../types';
import { 
  transactions as sampleTransactions,
  categories as sampleCategories,
  goals as sampleGoals,
  bills as sampleBills,
} from '../data/sampleData';
import { v4 as uuidv4 } from 'uuid';
import { getAIResponse, generateInsights } from '../utils/aiUtils';
import { calculateFinancialHealthScore } from '../utils/financialUtils';

interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  goals: Goal[];
  bills: Bill[];
  insights: AIInsight[];
  chatMessages: ChatMessage[];
  healthScore: number;
  activeTab: string;
  user: User | null;
  setActiveTab: (tab: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  updateBill: (bill: Bill) => void;
  sendChatMessage: (message: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider: React.FC<FinanceProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [categories] = useState<Category[]>(sampleCategories);
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [bills, setBills] = useState<Bill[]>(sampleBills);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm FinanceAI, your personal finance assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [healthScore, setHealthScore] = useState<number>(78);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [user, setUser] = useState<User | null>(null);

  // Update insights when data changes
  useEffect(() => {
    if (user) {
      const newInsights = generateInsights({
        transactions,
        goals,
        bills,
        insights,
        user
      });
      setInsights(newInsights);
    }
  }, [transactions, goals, bills, user]);

  // Calculate financial health score on data changes
  useEffect(() => {
    const newScore = calculateFinancialHealthScore(transactions, goals);
    setHealthScore(newScore);
  }, [transactions, goals]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === transaction.id ? transaction : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: uuidv4()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (goal: Goal) => {
    setGoals(prev => 
      prev.map(g => g.id === goal.id ? goal : g)
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const updateBill = (bill: Bill) => {
    setBills(prev => 
      prev.map(b => b.id === bill.id ? bill : b)
    );
  };

  const sendChatMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(message, {
        transactions,
        goals,
        bills,
        insights,
        user: user!
      });
      
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    transactions,
    categories,
    goals,
    bills,
    insights,
    chatMessages,
    healthScore,
    activeTab,
    user,
    setActiveTab,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    updateBill,
    sendChatMessage,
    login,
    logout
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};