import React from 'react';

/**
 * Dashboard Component
 * 
 * This file was originally a static HTML mockup and has been converted 
 * into a valid React component to fix TSX compilation errors.
 */

const Dashboard: React.FC = () => {
  return (
    <div className="bg-[#f6f8f6] dark:bg-[#102213] font-display text-slate-900 dark:text-slate-100 antialiased h-screen overflow-hidden flex flex-col">
      {/* Inline styles for the chart grid and scrollbar handling */}
      <style>
        {`
          .chart-grid {
              background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
              background-size: 24px 24px;
          }
          .dark .chart-grid {
              background-image: radial-gradient(#1f2937 1px, transparent 1px);
          }
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
        `}
      </style>
      
      {/* Top Navigation Bar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900 px-6 z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#13ec37] p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-zinc-900 font-bold">query_stats</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">StartZoda</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 ml-4">
            <a className="text-[#4184f3] font-semibold border-b-2 border-[#4184f3] py-5 px-1 text-sm" href="#">Dashboard</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#4184f3] font-medium py-5 px-1 text-sm transition-colors" href="#">Orders</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#4184f3] font-medium py-5 px-1 text-sm transition-colors" href="#">Holdings</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#4184f3] font-medium py-5 px-1 text-sm transition-colors" href="#">Positions</a>
            <a className="text-slate-500 dark:text-slate-400 hover:text-[#4184f3] font-medium py-5 px-1 text-sm transition-colors" href="#">Funds</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Available Margin</span>
            <div className="flex items-center gap-1.5 bg-[#13ec37]/10 text-[#13ec37] px-3 py-1 rounded-full border border-[#13ec37]/20">
              <span className="text-sm font-bold">25,400.00 Z</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <button className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-zinc-800 p-1 rounded-lg transition-colors">
            <div className="size-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
              <img 
                alt="User Profile" 
                className="w-full h-full object-cover" 
                src="https://api.dicebear.com/7.x/initials/svg?seed=XZ1234" 
              />
            </div>
            <span className="text-sm font-medium hidden sm:inline">XZ1234</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Market Watch */}
        <aside className="w-80 md:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900">
          <div className="p-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4184f3] transition-colors">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-[#4184f3]/50 text-sm transition-all placeholder:text-slate-400" 
                placeholder="Search eg: infy bse, nifty fut, gold mcx" 
                type="text" 
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Market Watch Item: NIFTY 50 */}
            <div className="group flex items-center justify-between p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer bg-slate-100/50 dark:bg-zinc-800/30">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">NIFTY 50</span>
                <span className="text-[10px] text-slate-400 uppercase font-medium">NSE</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col">
                  <span className="text-sm font-bold text-[#13ec37]">22,450.20</span>
                  <span className="text-[10px] text-[#13ec37] font-bold">+0.85%</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">B</button>
                  <button className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">S</button>
                </div>
              </div>
            </div>
            {/* Market Watch Item: SENSEX */}
            <div className="group flex items-center justify-between p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">SENSEX</span>
                <span className="text-[10px] text-slate-400 uppercase font-medium">BSE</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col">
                  <span className="text-sm font-bold text-[#ff4d4d]">73,810.15</span>
                  <span className="text-[10px] text-[#ff4d4d] font-bold">-0.12%</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">B</button>
                  <button className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">S</button>
                </div>
              </div>
            </div>
            {/* Market Watch Item: RELIANCE */}
            <div className="group flex items-center justify-between p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">RELIANCE</span>
                <span className="text-[10px] text-slate-400 uppercase font-medium">NSE</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col">
                  <span className="text-sm font-bold text-[#13ec37]">2,985.40</span>
                  <span className="text-[10px] text-[#13ec37] font-bold">+1.45%</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">B</button>
                  <button className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">S</button>
                </div>
              </div>
            </div>
            {/* Market Watch Item: INFY */}
            <div className="group flex items-center justify-between p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">INFY</span>
                <span className="text-[10px] text-slate-400 uppercase font-medium">NSE</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col">
                  <span className="text-sm font-bold text-[#ff4d4d]">1,420.10</span>
                  <span className="text-[10px] text-[#ff4d4d] font-bold">-2.30%</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">B</button>
                  <button className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">S</button>
                </div>
              </div>
            </div>
            {/* Market Watch Item: STARTZODA PREMIUM */}
            <div className="group flex items-center justify-between p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">STARTZODA</span>
                <span className="text-[10px] text-[#13ec37] uppercase font-bold tracking-tighter">PREMIUM</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right flex flex-col">
                  <span className="text-sm font-bold text-[#13ec37]">1,250.00</span>
                  <span className="text-[10px] text-[#13ec37] font-bold">+5.20%</span>
                </div>
                <div className="hidden group-hover:flex items-center gap-1">
                  <button className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">B</button>
                  <button className="bg-orange-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase shadow-sm">S</button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-zinc-950 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-zinc-800">
            <span>5/50 items</span>
            <button className="flex items-center gap-1 text-[#4184f3] hover:underline">
              <span className="material-symbols-outlined text-sm">settings</span>
              Manage
            </button>
          </div>
        </aside>

        {/* Main Content Area: Chart */}
        <section className="flex-1 flex flex-col bg-slate-50 dark:bg-zinc-950 relative">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">NIFTY 50</h2>
                <span className="bg-slate-100 dark:bg-zinc-800 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">INDEX</span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-lg">
                <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-zinc-700 shadow-sm">1m</button>
                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white/50 dark:hover:bg-zinc-700/50 rounded-md transition-all">5m</button>
                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white/50 dark:hover:bg-zinc-700/50 rounded-md transition-all">1h</button>
                <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-white/50 dark:hover:bg-zinc-700/50 rounded-md transition-all">1D</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">candlestick_chart</span>
                Chart
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">monitoring</span>
                Indicators
              </button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg">
                <span className="material-symbols-outlined text-xl">fullscreen</span>
              </button>
            </div>
          </div>
          
          {/* Main Chart Interface (Mockup) */}
          <div className="flex-1 relative chart-grid p-8 overflow-hidden">
            {/* Price Scale (Right) */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-white/80 dark:bg-zinc-900/80 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-around items-center text-[10px] font-bold text-slate-400 py-4 z-10">
              <span>22,500</span>
              <span>22,480</span>
              <div className="bg-[#13ec37] text-zinc-900 px-1.5 py-0.5 rounded-l flex items-center justify-center -ml-16 w-16 absolute top-1/2">22,450.2</div>
              <span>22,460</span>
              <span>22,440</span>
              <span>22,420</span>
              <span>22,400</span>
            </div>
            
            {/* Visual Candle Mockups */}
            <div className="h-full w-full flex items-end justify-center gap-3 pb-12 opacity-80">
              <div className="w-8 flex flex-col items-center gap-0">
                <div className="w-0.5 h-12 bg-[#ff4d4d]"></div>
                <div className="w-full h-32 bg-[#ff4d4d] rounded-sm shadow-lg"></div>
                <div className="w-0.5 h-8 bg-[#ff4d4d]"></div>
              </div>
              <div className="w-8 flex flex-col items-center gap-0">
                <div className="w-0.5 h-20 bg-[#13ec37]"></div>
                <div className="w-full h-40 bg-[#13ec37] rounded-sm shadow-lg"></div>
                <div className="w-0.5 h-16 bg-[#13ec37]"></div>
              </div>
              <div className="w-8 flex flex-col items-center gap-0">
                <div className="w-0.5 h-8 bg-[#13ec37]"></div>
                <div className="w-full h-24 bg-[#13ec37] rounded-sm shadow-lg"></div>
                <div className="w-0.5 h-12 bg-[#13ec37]"></div>
              </div>
              <div className="w-8 flex flex-col items-center gap-0">
                <div className="w-0.5 h-24 bg-[#ff4d4d]"></div>
                <div className="w-full h-20 bg-[#ff4d4d] rounded-sm shadow-lg"></div>
                <div className="w-0.5 h-10 bg-[#ff4d4d]"></div>
              </div>
              <div className="w-8 flex flex-col items-center gap-0">
                <div className="w-0.5 h-12 bg-[#13ec37]"></div>
                <div className="w-full h-56 bg-[#13ec37] rounded-sm shadow-lg relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl">
                    H: 22,485.0
                  </div>
                </div>
                <div className="w-0.5 h-16 bg-[#13ec37]"></div>
              </div>
              <div className="w-8 flex flex-col items-center gap-0 opacity-50">
                <div className="w-0.5 h-10 bg-slate-300"></div>
                <div className="w-full h-32 bg-slate-300 rounded-sm"></div>
                <div className="w-0.5 h-10 bg-slate-300"></div>
              </div>
            </div>

            {/* Floating Quick Trade Action Card */}
            <div className="absolute bottom-10 left-10 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-20">
              <div className="bg-[#4184f3] px-4 py-2 flex justify-between items-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Quick Trade</span>
                <span className="text-white/80 text-[10px]">NSE: NIFTY 50</span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex gap-2">
                  <label className="flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Qty</span>
                    <input className="w-full mt-1 border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded text-sm font-bold" type="number" defaultValue="50" />
                  </label>
                  <label className="flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Price (Z)</span>
                    <input className="w-full mt-1 border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded text-sm font-bold" type="text" defaultValue="22,450.20" />
                  </label>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#4184f3] hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-500/20">BUY</button>
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-orange-500/20">SELL</button>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Margin Required: 11,225.10 Z</span>
                  <span className="text-[#13ec37]">Available: 25,400 Z</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Market Summary */}
          <footer className="h-10 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-20">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Nifty 50</span>
                <span className="text-xs font-bold text-[#13ec37]">22,450.20</span>
                <span className="text-[10px] font-bold text-[#13ec37]">+0.85%</span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-zinc-800 pl-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sensex</span>
                <span className="text-xs font-bold text-[#ff4d4d]">73,810.15</span>
                <span className="text-[10px] font-bold text-[#ff4d4d]">-0.12%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#13ec37]"></span> Market Open</span>
              <span className="text-slate-500">14:32:05</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
