import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

const AIInsights: React.FC = () => {
  const { insights } = useFinance();
  
  // Get icon based on insight type
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="text-warning-500" size={20} />;
      case 'success':
        return <CheckCircle className="text-success-500" size={20} />;
      case 'info':
      default:
        return <TrendingUp className="text-primary-500" size={20} />;
    }
  };
  
  // Get background color based on insight type
  const getInsightBackground = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-warning-500 bg-opacity-10';
      case 'success':
        return 'bg-success-500 bg-opacity-10';
      case 'info':
      default:
        return 'bg-primary-500 bg-opacity-10';
    }
  };

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">AI Insights</h3>
      
      <div className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-gray-500 text-center py-3">No insights available</p>
        ) : (
          insights.map(insight => (
            <div 
              key={insight.id}
              className={`p-4 rounded-lg ${getInsightBackground(insight.type)}`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3 mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                
                <div>
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                  
                  {insight.actionable && insight.action && (
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-2">
                      {insight.action.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIInsights;