import React from 'react';
import FinancialHealthMeter from './FinancialHealthMeter';
import IncomeExpenseChart from './IncomeExpenseChart';
import CategorySpendingChart from './CategorySpendingChart';
import UpcomingBills from './UpcomingBills';
import SavingsGoals from './SavingsGoals';
import AIInsights from './AIInsights';
import { useFinance } from '../../context/FinanceContext';
import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/financialUtils';

const Dashboard: React.FC = () => {
  const { healthScore, transactions } = useFinance();
  
  // Calculate totals for the summary cards
  const income = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);
    
  const savings = income - expenses;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="card p-5 bg-primary-500 bg-opacity-10 border border-primary-200">
          <div className="flex items-center">
            <div className="bg-primary-500 p-3 rounded-full mr-4">
              <ArrowDown className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Monthly Income</h3>
              <p className="text-2xl font-bold text-primary-700">{formatCurrency(income)}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-5 bg-accent-500 bg-opacity-10 border border-accent-200">
          <div className="flex items-center">
            <div className="bg-accent-500 p-3 rounded-full mr-4">
              <ArrowUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Monthly Expenses</h3>
              <p className="text-2xl font-bold text-accent-700">{formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-5 bg-secondary-500 bg-opacity-10 border border-secondary-200">
          <div className="flex items-center">
            <div className="bg-secondary-500 p-3 rounded-full mr-4">
              <Wallet className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Monthly Savings</h3>
              <p className="text-2xl font-bold text-secondary-700">{formatCurrency(savings)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="col-span-1">
          <FinancialHealthMeter score={healthScore} />
        </div>
        
        <div className="col-span-1">
          <SavingsGoals />
        </div>
        
        <div className="col-span-1">
          <UpcomingBills />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <IncomeExpenseChart />
        </div>
        
        <div className="col-span-1">
          <CategorySpendingChart />
        </div>
        
        <div className="col-span-1 md:col-span-3">
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;