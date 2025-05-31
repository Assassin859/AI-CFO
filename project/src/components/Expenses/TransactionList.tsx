import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/financialUtils';
import { Edit, Trash2, Plus } from 'lucide-react';
import TransactionForm from './TransactionForm';

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleEdit = (id: string) => {
    setEditingTransaction(id);
    setShowAddForm(false);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };
  
  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        
        <button
          className="btn btn-primary flex items-center"
          onClick={() => {
            setShowAddForm(true);
            setEditingTransaction(null);
          }}
        >
          <Plus size={18} className="mr-1" />
          Add Transaction
        </button>
      </div>
      
      {showAddForm && (
        <div className="mb-6">
          <TransactionForm onClose={handleFormClose} />
        </div>
      )}
      
      {editingTransaction && (
        <div className="mb-6">
          <TransactionForm 
            transactionId={editingTransaction} 
            onClose={handleFormClose} 
          />
        </div>
      )}
      
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4">Category</th>
                <th className="text-right p-4">Amount</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                sortedTransactions.map(transaction => (
                  <tr 
                    key={transaction.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">{formatDate(transaction.date)}</td>
                    <td className="p-4">{transaction.description}</td>
                    <td className="p-4">{transaction.category}</td>
                    <td className={`p-4 text-right font-medium ${
                      transaction.type === 'income' ? 'text-success-500' : 'text-accent-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(transaction.id)}
                          className="p-1 text-gray-600 hover:text-primary-600 transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-1 text-gray-600 hover:text-error-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;