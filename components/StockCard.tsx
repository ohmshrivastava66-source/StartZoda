
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Stock } from '../types';
import { TrendingUp, TrendingDown, Plus } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onTrade: (stock: Stock) => void;
  isWatchlisted: boolean;
  onWatchlistToggle: (symbol: string) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onTrade, isWatchlisted, onWatchlistToggle }) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
          <p className="text-sm text-gray-500 truncate w-32">{stock.name}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onWatchlistToggle(stock.symbol)}
            className={`p-2 rounded-full transition-colors ${isWatchlisted ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
          >
            <Plus className={`w-4 h-4 transition-transform ${isWatchlisted ? 'rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div className="h-20 w-full mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stock.history}>
            <defs>
              <linearGradient id={`colorPrice-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={isPositive ? '#10b981' : '#f43f5e'} 
              fillOpacity={1} 
              fill={`url(#colorPrice-${stock.symbol})`} 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">₹{stock.price.toLocaleString()}</p>
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? '+' : ''}{stock.changePercent}%
          </div>
        </div>
        <button 
          onClick={() => onTrade(stock)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          Trade
        </button>
      </div>
    </div>
  );
};
