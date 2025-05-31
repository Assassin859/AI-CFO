import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Send } from 'lucide-react';
import { formatDate } from '../../utils/financialUtils';

const ChatInterface: React.FC = () => {
  const { chatMessages, sendChatMessage } = useFinance();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    sendChatMessage(message);
    setMessage('');
  };
  
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">AI Assistant</h2>
      
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {chatMessages.map(msg => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary-500 text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="mb-1">{msg.text}</p>
                  <p className={`text-xs ${msg.sender === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                    {formatDate(msg.timestamp, 'h:mm a')}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your finances..."
              className="input flex-1 rounded-r-none focus:z-10"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg transition-colors"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </form>
          <div className="mt-2 text-xs text-gray-500">
            <p>Try asking:</p>
            <ul className="mt-1 space-y-1">
              <li>• "How much did I spend on groceries this month?"</li>
              <li>• "What's my progress on my emergency fund?"</li>
              <li>• "How much am I saving each month?"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;