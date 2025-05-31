import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { LogIn, Key } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useFinance();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Demo login - in production, this would validate against a backend
    if (formData.email === 'demo@example.com' && formData.password === 'demo123') {
      login({
        id: '1',
        email: formData.email,
        name: 'John Doe'
      });
    } else {
      setError('Invalid credentials. Try demo@example.com / demo123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-primary-500 text-white p-3 rounded-xl inline-flex mb-4">
            <Key size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to FinanceAI</h1>
          <p className="text-gray-600 mt-2">Your personal finance assistant</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          
          {error && (
            <p className="text-error-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            <LogIn size={20} className="mr-2" />
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo Account:</p>
          <p className="font-medium">Email: demo@example.com</p>
          <p className="font-medium">Password: demo123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;