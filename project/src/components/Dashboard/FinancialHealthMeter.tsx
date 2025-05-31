import React from 'react';

interface FinancialHealthMeterProps {
  score: number;
}

const FinancialHealthMeter: React.FC<FinancialHealthMeterProps> = ({ score }) => {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-secondary-500';
    if (score >= 40) return 'text-warning-500';
    return 'text-error-500';
  };

  // Determine status text based on score
  const getScoreStatus = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  // Calculate meter rotation (0 to 180 degrees)
  const rotation = (score / 100) * 180;

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">Financial Health</h3>
      
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-20 mb-4">
          {/* Meter background */}
          <div className="absolute w-full h-full bg-gray-200 rounded-t-full overflow-hidden">
            {/* Colored sections */}
            <div className="absolute bottom-0 left-0 w-full h-full flex">
              <div className="h-full w-1/4 bg-error-500"></div>
              <div className="h-full w-1/4 bg-warning-500"></div>
              <div className="h-full w-1/4 bg-secondary-500"></div>
              <div className="h-full w-1/4 bg-success-500"></div>
            </div>
          </div>
          
          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom transform -translate-x-1/2"
            style={{ transform: `translateX(-50%) rotate(${rotation - 90}deg)` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
          
          {/* Center point */}
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        {/* Score */}
        <div className="text-center">
          <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
          <span className="text-gray-500 text-sm ml-1">/100</span>
        </div>
        
        {/* Status */}
        <p className={`text-sm font-medium mt-1 ${getScoreColor()}`}>
          {getScoreStatus()}
        </p>
      </div>
    </div>
  );
};

export default FinancialHealthMeter;