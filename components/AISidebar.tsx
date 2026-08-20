
import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';
import { getAIInsights } from '../services/gemini';

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISidebar: React.FC<AISidebarProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
    { role: 'ai', content: "Hi! I'm Zoda AI. I can help you understand market basics, analyze your trades, or explain what terms like 'P/E Ratio' mean. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const response = await getAIInsights(userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: response || "Something went wrong." }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100 animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-indigo-600 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Zoda AI Assistant</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Always Learning</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-100 p-3 rounded-2xl flex gap-2 items-center text-sm text-gray-500">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                Zoda is thinking...
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask about PE ratio, stocks, or your risk..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-12 py-4 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 top-2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
