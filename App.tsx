
import React, { useState, useEffect, useMemo } from 'react';
import { User, Stock, Holding, Trade, PortfolioHistoryPoint } from './types';
import { MOCK_STOCKS, INITIAL_CASH } from './constants';
import { AISidebar } from './components/AISidebar';
import { VarsityView } from './components/VarsityView';
import { CoinView } from './components/CoinView';
import { KiteView } from './components/KiteView';
import { SettingsView } from './components/SettingsView';
import { 
  Bell,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

type Platform = 'kite' | 'coin' | 'learn' | 'profile';

interface Notification {
  id: string;
  type: 'success' | 'error';
  message: string;
}

const App: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('kite');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User>({
    id: 'XZ1234',
    name: 'Aryan Sharma',
    email: 'trader@startzoda.ai',
    role: 'user',
    cash: INITIAL_CASH,
    collateral: 0,
    marginUsed: 0,
    age: 20,
    settings: {
      theme: 'light',
      notifications: true
    }
  });
  
  const [stocks, setStocks] = useState<Stock[]>(() => 
    MOCK_STOCKS.map(s => ({
      ...s,
      history: Array.from({ length: 40 }, (_, i) => ({
        time: `${9 + Math.floor(i/4)}:${(i%4)*15}`,
        price: s.price + (Math.random() * 20 - 10)
      }))
    }))
  );

  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistoryPoint[]>(() => {
    const now = new Date();
    return Array.from({ length: 60 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (60 - i));
      return {
        time: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        value: INITIAL_CASH + (Math.random() * 8000 - 4000)
      };
    });
  });

  const portfolioValue = useMemo(() => {
    const holdingsValue = holdings.reduce((acc, h) => {
      const stock = stocks.find(s => s.symbol === h.symbol);
      return acc + (h.quantity * (stock?.price || h.lastPrice));
    }, 0);
    return user.cash + holdingsValue;
  }, [user.cash, holdings, stocks]);

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const updateHistory = (value: number) => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setPortfolioHistory(prev => [...prev, { time: timeLabel, value }].slice(-100));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateHistory(portfolioValue);
    }, 30000);
    return () => clearInterval(interval);
  }, [portfolioValue]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        if (s.symbol.includes('INDEX')) return s;
        const volatility = 0.001;
        const change = s.price * (Math.random() * volatility * 2 - volatility);
        const newPrice = Number((s.price + change).toFixed(2));
        const newHistory = [...s.history.slice(1), { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          price: newPrice 
        }];
        return {
          ...s,
          price: newPrice,
          change: Number((newPrice - (s.price - s.change)).toFixed(2)),
          changePercent: Number(((newPrice - (s.price - s.change)) / (s.price - s.change) * 100).toFixed(2)),
          history: newHistory
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExecuteOrder = (type: 'BUY' | 'SELL', symbol: string, quantity: number, price: number) => {
    if (quantity <= 0) return;
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    const value = quantity * price;
    const totalCharges = value * 0.001;
    
    if (type === 'BUY') {
      if (user.cash < value + totalCharges) {
        addNotification('error', `Insufficient funds to buy ${quantity} ${symbol}`);
        return;
      }
      
      const newCash = user.cash - (value + totalCharges);
      setUser(prev => ({ ...prev, cash: newCash }));
      
      setHoldings(prev => {
        const existing = prev.find(h => h.symbol === stock.symbol);
        if (existing) {
          return prev.map(h => h.symbol === stock.symbol 
            ? { ...h, quantity: h.quantity + quantity, avgPrice: (h.avgPrice * h.quantity + value) / (h.quantity + quantity) }
            : h
          );
        }
        return [...prev, { symbol: stock.symbol, quantity, avgPrice: price, lastPrice: price, pnl: 0, pnlPercent: 0 }];
      });
      addNotification('success', `Bought ${quantity} shares of ${symbol}`);
      updateHistory(portfolioValue - totalCharges);
    } else {
      const existing = holdings.find(h => h.symbol === symbol);
      if (!existing || existing.quantity < quantity) {
        addNotification('error', `You don't have enough ${symbol} to sell`);
        return;
      }

      const newCash = user.cash + (value - totalCharges);
      setUser(prev => ({ ...prev, cash: newCash }));
      
      setHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, quantity: h.quantity - quantity } : h).filter(h => h.quantity > 0));
      addNotification('success', `Sold ${quantity} shares of ${symbol}`);
      updateHistory(portfolioValue - totalCharges);
    }

    setTrades(prev => [{
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      symbol: stock.symbol,
      type,
      product: 'CNC',
      quantity,
      price,
      charges: totalCharges,
      status: 'COMPLETE',
      timestamp: new Date()
    }, ...prev]);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f6f8f6] font-display">
      {/* Notifications Portal */}
      <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border pointer-events-auto animate-in slide-in-from-right duration-300 ${
            n.type === 'success' ? 'bg-[#13ec37] text-slate-900 border-[#13ec37]/20' : 'bg-red-500 text-white border-red-400'
          }`}>
            {n.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-black">{n.message}</span>
          </div>
        ))}
      </div>

      <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPlatform('kite')}>
            <div className="bg-[#13ec37] p-1.5 rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-zinc-900 font-bold text-xl">query_stats</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-zinc-900">StartZoda</h1>
          </div>
          <nav className="flex items-center gap-6 ml-4">
            <button onClick={() => setPlatform('kite')} className={`text-[13px] font-bold py-5 px-1 border-b-2 transition-all ${platform === 'kite' ? 'text-[#4184f3] border-[#4184f3]' : 'text-slate-400 border-transparent hover:text-zinc-800'}`}>Kite</button>
            <button onClick={() => setPlatform('coin')} className={`text-[13px] font-bold py-5 px-1 border-b-2 transition-all ${platform === 'coin' ? 'text-[#4184f3] border-[#4184f3]' : 'text-slate-400 border-transparent hover:text-zinc-800'}`}>Coin</button>
            <button onClick={() => setPlatform('learn')} className={`text-[13px] font-bold py-5 px-1 border-b-2 transition-all ${platform === 'learn' ? 'text-[#13ec37] border-[#13ec37]' : 'text-slate-400 border-transparent hover:text-zinc-800'}`}>Learn</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">Available Margin</span>
            <div className="flex items-center gap-1.5 bg-[#13ec37]/10 text-[#13ec37] px-3 py-1 rounded-full border border-[#13ec37]/20">
              <span className="text-xs font-bold font-mono">{user.cash.toLocaleString('en-IN', { minimumFractionDigits: 2 })} Z</span>
            </div>
          </div>
          <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
             <button onClick={() => setIsAISidebarOpen(true)} className="p-2 text-slate-400 hover:text-[#4184f3] hover:bg-slate-50 rounded-lg transition-all"><Sparkles size={20} /></button>
             <Bell size={20} className="text-slate-400 cursor-pointer hover:text-slate-800" />
             <div onClick={() => setPlatform('profile')} className={`flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-xl transition-all ${platform === 'profile' ? 'bg-slate-50 ring-1 ring-slate-200' : 'hover:bg-slate-50'}`}>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-800 leading-none">{user.id}</span>
                  <span className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-tighter">{user.name.split(' ')[0]}</span>
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {platform === 'kite' && <KiteView stocks={stocks} userCash={user.cash} onExecute={handleExecuteOrder} holdings={holdings} />}
        {platform === 'coin' && <CoinView cash={user.cash} portfolioHistory={portfolioHistory} portfolioValue={portfolioValue} />}
        {platform === 'learn' && <VarsityView />}
        {platform === 'profile' && <SettingsView user={user} onUpdateUser={handleUpdateUser} />}
      </main>
      <AISidebar isOpen={isAISidebarOpen} onClose={() => setIsAISidebarOpen(false)} />
    </div>
  );
};

export default App;
