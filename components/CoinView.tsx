
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PortfolioHistoryPoint } from '../types';
import { 
  TrendingUp, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Flame,
  PieChart,
  ArrowRight,
  Clock
} from 'lucide-react';

interface CoinViewProps {
  cash: number;
  portfolioHistory: PortfolioHistoryPoint[];
  portfolioValue: number;
}

export const CoinView: React.FC<CoinViewProps> = ({ cash, portfolioHistory, portfolioValue }) => {
  const [timeframe, setTimeframe] = useState<'1M' | '6M' | '1Y' | 'ALL'>('1M');

  const filteredHistory = useMemo(() => {
    const pointsCount = timeframe === '1M' ? 30 : timeframe === '6M' ? 60 : timeframe === '1Y' ? 90 : portfolioHistory.length;
    return portfolioHistory.slice(-pointsCount);
  }, [portfolioHistory, timeframe]);

  const stats = useMemo(() => {
    const startValue = filteredHistory[0]?.value || INITIAL_CASH;
    const currentWealth = portfolioValue;
    const pnl = currentWealth - startValue;
    const pnlPercent = (pnl / startValue) * 100;
    return { pnl, pnlPercent };
  }, [filteredHistory, portfolioValue]);

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-[#f6f8f6] min-h-full space-y-8 animate-in fade-in duration-300 overflow-y-auto">
      <div className="flex justify-between items-center">
         <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Portfolio & Wealth</h1>
            <p className="text-sm text-slate-500 font-medium">Detailed breakdown of your virtual net worth and asset growth.</p>
         </div>
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-bold text-zinc-700 hover:bg-slate-50 transition-all shadow-sm">
               <FileText size={16} /> Report
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-[#ff5722] text-white rounded-lg text-sm font-extrabold transition-all shadow-md shadow-orange-500/20">
               <span className="text-lg">+</span> New Investment
            </button>
         </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Available Cash', val: `${cash.toLocaleString('en-IN')} Z`, sub: 'Buying Power', color: 'text-zinc-800' },
          { label: 'Total Wealth', val: `${portfolioValue.toLocaleString('en-IN')} Z`, sub: 'Current Net Worth', color: 'text-zinc-800' },
          { label: 'Total Returns', val: `${stats.pnl >= 0 ? '+' : ''}${stats.pnl.toLocaleString('en-IN')} Z`, sub: `▲ ${stats.pnlPercent.toFixed(2)}%`, color: stats.pnl >= 0 ? 'text-[#13ec37]' : 'text-[#ff4d4d]' }
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">{card.label}</span>
            <div className="flex items-baseline gap-3">
               <span className={`text-2xl font-black tracking-tight ${card.color}`}>{card.val}</span>
               <span className={`text-xs font-bold ${stats.pnl >= 0 ? 'text-[#13ec37]' : 'text-[#ff4d4d]'}`}>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Growth Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-extrabold text-zinc-900">Wealth Curve</h3>
                <div className="flex bg-slate-50 p-1 rounded-lg border">
                  {(['1M', '6M', '1Y', 'ALL'] as const).map(t => (
                    <button 
                      key={t} 
                      onClick={() => setTimeframe(t)}
                      className={`px-4 py-1 text-[10px] font-extrabold rounded-md transition-all ${timeframe === t ? 'bg-white shadow-sm text-[#4184f3]' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
             </div>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={filteredHistory}>
                   <defs>
                     <linearGradient id="coinGrowth" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#4184f3" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#4184f3" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} dy={15} />
                   <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
                   <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                    formatter={(val: number) => [`${val.toLocaleString()} Z`, 'Value']}
                   />
                   <Area type="monotone" dataKey="value" stroke="#4184f3" strokeWidth={3} fill="url(#coinGrowth)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Explore Funds Section */}
          <div className="space-y-4">
             <h3 className="text-lg font-extrabold text-zinc-900">Investment Strategies</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Equity', sub: 'Growth focused', icon: <TrendingUp size={20}/>, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { label: 'Debt', sub: 'Stable returns', icon: <ShieldCheck size={20}/>, color: 'text-orange-500', bg: 'bg-orange-50' },
                  { label: 'Hybrid', sub: 'Balanced risk', icon: <PieChart size={20}/>, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { label: 'ELSS', sub: 'Tax saving', icon: <Flame size={20}/>, color: 'text-emerald-500', bg: 'bg-emerald-50' }
                ].map((cat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-[#4184f3] hover:-translate-y-1 transition-all cursor-pointer shadow-sm group">
                     <div className={`${cat.bg} ${cat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        {cat.icon}
                     </div>
                     <h4 className="font-extrabold text-sm text-zinc-800">{cat.label}</h4>
                     <p className="text-[11px] text-slate-400 font-bold">{cat.sub}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4">
             <div className="flex items-center gap-3">
               <div className="bg-[#4184f3] p-2 rounded-xl">
                  <PieChart size={20} className="text-white" />
               </div>
               <h4 className="text-sm font-extrabold text-blue-900">Portfolio Insight</h4>
             </div>
             <p className="text-xs text-blue-800/70 leading-relaxed font-medium">
                Your portfolio has grown by <strong>{stats.pnlPercent.toFixed(1)}%</strong> over the selected {timeframe} period. Your cash reserve is strong at {((cash/portfolioValue)*100).toFixed(0)}% of total net worth.
             </p>
             <button className="flex items-center gap-2 text-xs font-extrabold text-[#4184f3] hover:underline">
                Analyze Risk <ArrowRight size={14} />
             </button>
          </div>

          {/* Quick Tools */}
          <div className="grid grid-cols-2 gap-4">
             <button className="bg-white p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex flex-col items-center gap-3 group">
                <Clock size={24} className="text-[#4184f3] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-extrabold text-zinc-700">History</span>
             </button>
             <button className="bg-white p-5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex flex-col items-center gap-3 group">
                <FileText size={24} className="text-[#4184f3] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-extrabold text-zinc-700">Report</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const INITIAL_CASH = 100000;
