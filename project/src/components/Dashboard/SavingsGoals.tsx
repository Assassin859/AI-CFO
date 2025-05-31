import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatPercentage } from '../../utils/financialUtils';

const SavingsGoals: React.FC = () => {
  const { goals } = useFinance();
  
  // Calculate percentage complete
  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">Savings Goals</h3>
      
      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-500 text-center py-3">No savings goals</p>
        ) : (
          goals.map(goal => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="space-y-1">
                <div className="flex justify-between items-end">
                  <h4 className="font-medium">{goal.name}</h4>
                  <div className="text-sm">
                    <span className="font-semibold">{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-gray-500"> / {formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                    <div 
                      style={{ 
                        width: `${progress * 100}%`,
                        backgroundColor: goal.color 
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatPercentage(progress)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;