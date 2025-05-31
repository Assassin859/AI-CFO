import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { 
  LayoutDashboard, 
  Wallet, 
  Target, 
  MessageSquare, 
  BarChart3,
  BellDot, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleMobileSidebar }) => {
  const { activeTab, setActiveTab } = useFinance();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <Wallet size={20} /> },
    { id: 'goals', label: 'Goals', icon: <Target size={20} /> },
    { id: 'chat', label: 'AI Chat', icon: <MessageSquare size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} />, disabled: true },
    { id: 'notifications', label: 'Alerts', icon: <BellDot size={20} />, disabled: true },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} />, disabled: true }
  ];
  
  const handleMenuClick = (id: string) => {
    setActiveTab(id);
    
    // Close mobile sidebar if open
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-30
          w-64 bg-white shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-xl font-bold">FinanceAI</h1>
          <button 
            onClick={toggleMobileSidebar}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Logo (desktop) */}
        <div className="hidden md:flex items-center p-6">
          <div className="bg-primary-500 text-white p-2 rounded-lg mr-3">
            <BarChart3 size={24} />
          </div>
          <h1 className="text-xl font-bold">FinanceAI</h1>
        </div>
        
        {/* Menu items */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  disabled={item.disabled}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${activeTab === item.id 
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'}
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;