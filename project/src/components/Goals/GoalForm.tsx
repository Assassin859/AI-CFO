import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { X } from 'lucide-react';

interface GoalFormProps {
  goalId?: string;
  onClose: () => void;
}

const GOAL_COLORS = [
  '#0073f7', // primary
  '#00c3af', // secondary
  '#ff6900', // accent
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#ef4444', // red
  '#f59e0b', // amber
  '#10b981', // emerald
];

const GoalForm: React.FC<GoalFormProps> = ({ goalId, onClose }) => {
  const { goals, addGoal, updateGoal } = useFinance();
  
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    color: GOAL_COLORS[0]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // If editing, populate form with goal data
  useEffect(() => {
    if (goalId) {
      const goal = goals.find(g => g.id === goalId);
      
      if (goal) {
        setFormData({
          name: goal.name,
          targetAmount: goal.targetAmount.toString(),
          currentAmount: goal.currentAmount.toString(),
          endDate: goal.endDate,
          color: goal.color
        });
      }
    }
  }, [goalId, goals]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleColorSelect = (color: string) => {
    setFormData({
      ...formData,
      color
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Goal name is required';
    }
    
    if (!formData.targetAmount) {
      newErrors.targetAmount = 'Target amount is required';
    } else if (isNaN(Number(formData.targetAmount)) || Number(formData.targetAmount) <= 0) {
      newErrors.targetAmount = 'Target amount must be a positive number';
    }
    
    if (!formData.currentAmount) {
      newErrors.currentAmount = 'Current amount is required';
    } else if (isNaN(Number(formData.currentAmount)) || Number(formData.currentAmount) < 0) {
      newErrors.currentAmount = 'Current amount must be a non-negative number';
    } else if (Number(formData.currentAmount) > Number(formData.targetAmount)) {
      newErrors.currentAmount = 'Current amount cannot exceed target amount';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'Target date is required';
    } else if (new Date(formData.endDate) <= new Date()) {
      newErrors.endDate = 'Target date must be in the future';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const goalData = {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      endDate: formData.endDate,
      color: formData.color
    };
    
    if (goalId) {
      updateGoal({
        ...goalData,
        id: goalId
      });
    } else {
      addGoal(goalData);
    }
    
    onClose();
  };

  return (
    <div className="card p-5 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {goalId ? 'Edit Goal' : 'Add New Goal'}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Vacation, Emergency Fund"
            className={`input ${errors.name ? 'border-error-500' : ''}`}
          />
          {errors.name && (
            <p className="text-error-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="targetAmount"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="0.00"
                className={`input pl-8 ${errors.targetAmount ? 'border-error-500' : ''}`}
              />
            </div>
            {errors.targetAmount && (
              <p className="text-error-500 text-xs mt-1">{errors.targetAmount}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Current Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="text"
                id="currentAmount"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                placeholder="0.00"
                className={`input pl-8 ${errors.currentAmount ? 'border-error-500' : ''}`}
              />
            </div>
            {errors.currentAmount && (
              <p className="text-error-500 text-xs mt-1">{errors.currentAmount}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            Target Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`input ${errors.endDate ? 'border-error-500' : ''}`}
          />
          {errors.endDate && (
            <p className="text-error-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal Color
          </label>
          <div className="flex flex-wrap gap-3">
            {GOAL_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {goalId ? 'Update' : 'Add'} Goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm;