import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import Login from './components/Auth/Login';
import { FinanceProvider, useFinance } from './context/FinanceContext';

const AppContent: React.FC = () => {
  const { user } = useFinance();
  return user ? <MainLayout /> : <Login />;
};

function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}

export default App;