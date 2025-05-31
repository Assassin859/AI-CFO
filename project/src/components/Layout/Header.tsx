import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar }) => {
  const { user, logout } = useFinance();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileSidebar}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-primary-100 text-primary-700 p-2 rounded-full">
                {user?.name.charAt(0)}
              </div>
              <span className="ml-2 font-medium hidden sm:block">{user?.name}</span>
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-error-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;