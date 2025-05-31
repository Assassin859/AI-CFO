import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import { getTransactionsByMonth, prepareSpendingCategoryData, formatCurrency } from '../../utils/financialUtils';

const COLORS = ['#0073f7', '#00c3af', '#ff6900', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#84cc16', '#06b6d4', '#6b7280'];

const CategorySpendingChart: React.FC = () => {
  const { transactions, categories } = useFinance();
  
  // Get current month transactions
  const currentMonthTransactions = getTransactionsByMonth(transactions, 0);
  
  // Prepare data for pie chart
  const data = prepareSpendingCategoryData(currentMonthTransactions);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const category = payload[0].name;
      const amount = payload[0].value;
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-medium">{category}</p>
          <p className="text-gray-700">{formatCurrency(amount)}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">Top Spending Categories</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategorySpendingChart;