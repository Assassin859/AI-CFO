export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  endDate: string;
  color: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  recurrence: 'monthly' | 'quarterly' | 'yearly' | 'one-time';
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  category?: string;
  relatedTransactions?: string[];
  actionable: boolean;
  action?: {
    text: string;
    url?: string;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}