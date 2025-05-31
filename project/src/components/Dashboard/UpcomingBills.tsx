import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/financialUtils';
import { Check, AlertCircle } from 'lucide-react';

const UpcomingBills: React.FC = () => {
  const { bills, updateBill } = useFinance();
  
  // Sort bills by due date (closest first)
  const sortedBills = [...bills].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
  
  // Toggle paid status
  const togglePaidStatus = (bill: typeof bills[0]) => {
    updateBill({
      ...bill,
      isPaid: !bill.isPaid
    });
  };
  
  // Calculate days until due
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    // Set hours to 0 to compare just the dates
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Get status display
  const getStatusDisplay = (bill: typeof bills[0]) => {
    if (bill.isPaid) {
      return (
        <span className="inline-flex items-center text-success-500">
          <Check size={16} className="mr-1" />
          Paid
        </span>
      );
    }
    
    const daysUntilDue = getDaysUntilDue(bill.dueDate);
    
    if (daysUntilDue < 0) {
      return (
        <span className="inline-flex items-center text-error-500">
          <AlertCircle size={16} className="mr-1" />
          Overdue
        </span>
      );
    }
    
    if (daysUntilDue <= 3) {
      return (
        <span className="inline-flex items-center text-warning-500">
          <AlertCircle size={16} className="mr-1" />
          Due soon
        </span>
      );
    }
    
    return (
      <span className="text-gray-500">
        Due in {daysUntilDue} days
      </span>
    );
  };

  return (
    <div className="card p-5 animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">Upcoming Bills</h3>
      
      <div className="space-y-3">
        {sortedBills.length === 0 ? (
          <p className="text-gray-500 text-center py-3">No upcoming bills</p>
        ) : (
          sortedBills.map(bill => (
            <div 
              key={bill.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <h4 className="font-medium">{bill.name}</h4>
                <div className="text-sm">
                  {getStatusDisplay(bill)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(bill.amount)}</div>
                <div className="text-sm text-gray-500">{formatDate(bill.dueDate, 'MMM d')}</div>
              </div>
              
              <div className="ml-4">
                <button 
                  onClick={() => togglePaidStatus(bill)}
                  className={`p-2 rounded-full transition-colors ${
                    bill.isPaid 
                      ? 'bg-success-500 text-white hover:bg-success-600' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingBills;