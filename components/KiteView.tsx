
import React, { useState, useMemo, useEffect } from 'react';
import { Stock, Holding } from '../types';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Search, Settings, CandlestickChart, Monitor, Fullscreen, LayoutGrid, Briefcase, Zap } from 'lucide-react';

interface KiteViewProps {
  stocks: Stock[];
  userCash: number;
  onExecute: (type: 'BUY' | 'SELL', symbol: string, quantity: number, price: number) => void;
  holdings: Holding[];
}

export const KiteView: React.FC<KiteViewProps> = ({ stocks, userCash, onExecute, holdings }) => {
  const [selectedStock, setSelectedStock] = useState<Stock>(stocks[0]);
  const [qty, setQty] = useState(50);
  const [activeTimeRange, setActiveTimeRange] = useState('1m');
  const [activeTab, setActiveTab] = useState<'watch' | 'holdings'>('watch');

  // Generate dynamic mock chart data based on selected time range
  const chartData = useMemo(() => {
    const points = activeTimeRange === '1m' ? 40 : activeTimeRange === '5m' ? 60 : activeTimeRange === '1h' ? 80 : 120;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      price: selectedStock.price + (Math.random() * 40 - 20),
      open: selectedStock.price + (Math.random() * 20 - 10),
      close: selectedStock.price + (Math.random() * 20 - 10),
      high: selectedStock.price + (Math.random() * 30),
      low: selectedStock.price - (Math.random() * 30),
    }));
  }, [selectedStock, activeTimeRange]);

  const handleSidebarTrade = (type: 'BUY' | 'SELL', stock: Stock) => {
    setSelectedStock(stock);
    if (type === 'SELL') {
      const holding = holdings.find(h => h.symbol === stock.symbol);
      if (holding) setQty(holding.quantity);
    }
  };

  const calculateMaxQty = () => {
    const max = Math.floor(userCash / (selectedStock.price * 1.001)); // Account for charges
    setQty(max);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Market Watch & Holdings */}
      <aside className="w-96 flex flex-col border-r border-slate-200 bg-white shadow-sm z-10">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('watch')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-all ${activeTab === 'watch' ? 'text-[#4184f3] border-b-2 border-[#4184f3]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={14} /> MARKETWATCH
          </button>
          <button 
            onClick={() => setActiveTab('holdings')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-all ${activeTab === 'holdings' ? 'text-[#4184f3] border-b-2 border-[#4184f3]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Briefcase size={14} /> HOLDINGS ({holdings.length})
          </button>
        </div>

        {activeTab === 'watch' ? (
          <>
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search eg: infy bse, nifty fut, gold mcx" 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#4184f3]/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {stocks.map(stock => {
                const isHeld = holdings.some(h => h.symbol === stock.symbol);
                return (
                  <div 
                    key={stock.symbol}
                    onClick={() => setSelectedStock(stock)}
                    className={`group flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${selectedStock.symbol === stock.symbol ? 'bg-slate-100/50' : ''}`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold text-zinc-800`}>{stock.symbol}</span>
                        {isHeld && <span className="text-[8px] bg-[#13ec37]/20 text-[#13ec37] px-1 rounded-sm font-black uppercase">Held</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">{stock.sector}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`text-right flex flex-col ${selectedStock.symbol === stock.symbol ? 'hidden' : 'flex'}`}>
                        <span className={`text-sm font-bold ${stock.change >= 0 ? 'text-[#13ec37]' : 'text-[#ff4d4d]'}`}>{stock.price.toFixed(2)}</span>
                        <span className={`text-[10px] font-bold ${stock.change >= 0 ? 'text-[#13ec37]' : 'text-[#ff4d4d]'}`}>
                          {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      {selectedStock.symbol === stock.symbol && (
                        <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-100">
                          <button onClick={(e) => { e.stopPropagation(); handleSidebarTrade('BUY', stock); }} className="bg-[#4184f3] text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm hover:brightness-110">B</button>
                          <button onClick={(e) => { e.stopPropagation(); handleSidebarTrade('SELL', stock); }} className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm hover:brightness-110">S</button>
                          <button className="p-1 text-slate-400 hover:text-zinc-800"><CandlestickChart size={14}/></button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {holdings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-4">
                <Briefcase size={40} className="text-slate-200" />
                <p className="text-sm font-bold text-slate-400">No holdings found. Start trading to see them here.</p>
              </div>
            ) : (
              holdings.map(h => {
                const stock = stocks.find(s => s.symbol === h.symbol);
                const currentPrice = stock?.price || h.lastPrice;
                const pnl = (currentPrice - h.avgPrice) * h.quantity;
                const pnlColor = pnl >= 0 ? 'text-[#13ec37]' : 'text-[#ff4d4d]';

                return (
                  <div key={h.symbol} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-[#4184f3] transition-all" onClick={() => { if(stock) setSelectedStock(stock); }}>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900">{h.symbol}</span>
                      <span className="text-[10px] font-bold text-slate-400">Qty: {h.quantity} • Avg: {h.avgPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right flex flex-col">
                        <span className="text-sm font-bold text-zinc-800">{currentPrice.toFixed(2)}</span>
                        <span className={`text-[10px] font-bold ${pnlColor}`}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onExecute('SELL', h.symbol, h.quantity, currentPrice); }}
                        className="opacity-0 group-hover:opacity-100 bg-orange-500 text-white text-[10px] px-3 py-1.5 rounded font-black uppercase transition-all"
                      >
                        Exit
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        <div className="p-3 bg-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100">
          <span>{activeTab === 'watch' ? `${stocks.length}/50 items` : `${holdings.length} Positions`}</span>
          <button className="flex items-center gap-1 text-[#4184f3] hover:underline">
            <Settings size={12} />
            Manage
          </button>
        </div>
      </aside>

      {/* Main Chart Section */}
      <section className="flex-1 flex flex-col relative bg-zinc-50 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-zinc-800">{selectedStock.symbol}</h2>
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-tight">{selectedStock.sector}</span>
            </div>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {['1m', '5m', '1h', '1D'].map(t => (
                <button 
                  key={t} 
                  onClick={() => setActiveTimeRange(t)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${activeTimeRange === t ? 'bg-white shadow-sm text-zinc-900' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <CandlestickChart size={16} /> Chart
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Monitor size={16} /> Indicators
            </button>
            <div className="w-px h-6 bg-slate-200"></div>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Fullscreen size={20} /></button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative chart-grid p-4 overflow-hidden">
           <ResponsiveContainer width="100%" height="85%">
             <BarChart data={chartData} margin={{ top: 20, right: 60, left: 0, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis hide dataKey="time" />
               <YAxis orientation="right" domain={['auto', 'auto']} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} stroke="#e2e8f0" />
               <Tooltip content={<></>} />
               <Bar 
                 dataKey="price" 
                 fill={selectedStock.change >= 0 ? "#13ec37" : "#ff4d4d"} 
                 radius={[2, 2, 0, 0]}
                 isAnimationActive={false}
               />
             </BarChart>
           </ResponsiveContainer>

           {/* Floating "Quick Trade" Card */}
           <div className="absolute bottom-10 left-10 w-80 bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden z-20 animate-in slide-in-from-bottom duration-500">
             <div className="bg-[#4184f3] px-4 py-2 flex justify-between items-center">
               <span className="text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> Quick Trade</span>
               <span className="text-white/80 text-[10px] font-bold">{selectedStock.symbol}</span>
             </div>
             <div className="p-5 flex flex-col gap-5">
               <div className="flex gap-4">
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Qty</label>
                      <button onClick={calculateMaxQty} className="text-[9px] font-black text-[#4184f3] hover:underline uppercase tracking-tighter">MAX</button>
                   </div>
                   <input 
                    type="number" 
                    value={qty} 
                    onChange={e => setQty(Number(e.target.value))}
                    className="w-full border-slate-200 rounded-lg text-sm font-bold focus:ring-[#4184f3] focus:border-[#4184f3]" 
                   />
                 </div>
                 <div className="flex-1">
                   <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Price (Z)</label>
                   <input 
                    readOnly
                    type="text" 
                    value={selectedStock.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm font-bold text-slate-500" 
                   />
                 </div>
               </div>
               <div className="flex gap-3">
                 <button 
                  onClick={() => onExecute('BUY', selectedStock.symbol, qty, selectedStock.price)}
                  className="flex-1 bg-[#4184f3] hover:bg-blue-600 text-white py-3 rounded-lg font-extrabold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                 >BUY</button>
                 <button 
                  onClick={() => onExecute('SELL', selectedStock.symbol, qty, selectedStock.price)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-extrabold text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                 >SELL</button>
               </div>
               <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                 <span>Margin Required: {(qty * selectedStock.price).toLocaleString()} Z</span>
                 <span className="text-[#13ec37]">Available: {userCash.toLocaleString()} Z</span>
               </div>
             </div>
           </div>
        </div>

        {/* Footer Bar */}
        <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-6 z-20">
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Nifty 50</span>
              <span className="text-xs font-bold text-[#13ec37]">22,450.20</span>
              <span className="text-[10px] font-bold text-[#13ec37]">+0.85%</span>
            </div>
            <div className="h-4 w-px bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase">Sensex</span>
              <span className="text-xs font-bold text-[#ff4d4d]">73,810.15</span>
              <span className="text-[10px] font-bold text-[#ff4d4d]">-0.12%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-extrabold text-slate-400">
            <span className="flex items-center gap-1.5 font-bold"><span className="w-2 h-2 rounded-full bg-[#13ec37]"></span> MARKET OPEN</span>
            <span className="text-slate-500 font-mono">14:32:05</span>
          </div>
        </footer>
      </section>
    </div>
  );
};
