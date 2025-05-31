import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate, formatPercentage } from '../../utils/financialUtils';
import { Edit, Trash2, Plus } from 'lucide-react';
import GoalForm from './GoalForm';

const GoalList: React.FC = () => {
  const { goals, deleteGoal } = useFinance();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  
  // Calculate percentage complete
  const calculateProgress = (current: number, target: number) => {
    return Math.min(current / target, 1);
  };
  
  const handleEdit = (id: string) => {
    setEditingGoal(id);
    setShowAddForm(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(id);
    }
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingGoal(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Savings Goals</h2>
        
        <button
          className="btn btn-primary flex items-center"
          onClick={() => {
            setShowAddForm(true);
            setEditingGoal(null);
          }}
        >
          <Plus size={18} className="mr-1" />
          Add Goal
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-6">
          <GoalForm onClose={handleFormClose} />
        </div>
      )}
      
      {editingGoal && (
        <div className="mb-6">
          <GoalForm 
            goalId={editingGoal} 
            onClose={handleFormClose} 
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {goals.length === 0 ? (
          <div className="col-span-full card p-8 text-center text-gray-500">
            <p>No savings goals yet. Add your first goal to get started!</p>
          </div>
        ) : (
          goals.map(goal => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="card overflow-hidden">
                {/* Progress bar at top */}
                <div 
                  className="h-2 transition-all duration-500"
                  style={{ 
                    width: `${progress * 100}%`,
                    backgroundColor: goal.color 
                  }}
                ></div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{goal.name}</h3>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(goal.id)}
                        className="p-1 text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(goal.id)}
                        className="p-1 text-gray-600 hover:text-error-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{formatPercentage(progress)}</span>
                    </div>
                    
                    <div className="flex justify-between font-medium">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span className="text-gray-500">of {formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Target Date</span>
                      <span>{formatDate(goal.endDate)}</span>
                    </div>
                    
                    {/* Calculate monthly amount needed */}
                    {(() => {
                      const remaining = goal.targetAmount - goal.currentAmount;
                      const today = new Date();
                      const endDate = new Date(goal.endDate);
                      const monthsLeft = 
                        (endDate.getFullYear() - today.getFullYear()) * 12 + 
                        (endDate.getMonth() - today.getMonth());
                      
                      if (monthsLeft <= 0 || remaining <= 0) return null;
                      
                      const monthlyAmount = remaining / Math.max(1, monthsLeft);
                      
                      return (
                        <div className="flex justify-between mt-1 font-medium">
                          <span>Monthly saving needed</span>
                          <span>{formatCurrency(monthlyAmount)}</span>
                        </div>
                      );
                    })()}
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

export default GoalList;