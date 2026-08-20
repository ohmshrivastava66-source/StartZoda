
import React, { useState } from 'react';

const PDF_GUIDES = [
  {
    id: 1,
    title: "Introduction to Stock Markets",
    description: "Master the fundamentals of equity trading, market participants, and how exchanges function globally.",
    level: "Beginner",
    pages: 12,
    badgeColor: "bg-[#13ec37] text-slate-900",
    icon: "article",
    gradient: "from-[#13ec37]/20 to-transparent"
  },
  {
    id: 2,
    title: "Fundamental Analysis 101",
    description: "A deep dive into reading balance sheets, P&L statements, and understanding intrinsic valuation models.",
    level: "Intermediate",
    pages: 24,
    badgeColor: "bg-blue-500 text-white",
    icon: "analytics",
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    id: 3,
    title: "Advanced Derivative Strategies",
    description: "Complex option Greeks, multi-leg spreads, and risk management for professional derivative trading.",
    level: "Advanced",
    pages: 45,
    badgeColor: "bg-red-500 text-white",
    icon: "query_stats",
    gradient: "from-red-500/10 to-transparent"
  }
];

const VIDEOS = [
  { 
    title: "Live Trading: Nifty Expiry Special", 
    image: "https://images.unsplash.com/photo-1611974717482-58f0003d81f6?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/@zerodhaonline"
  },
  { 
    title: "Crypto Outlook for 2024", 
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/@zerodhaonline"
  },
  { 
    title: "Intro to Option Greeks", 
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/@zerodhaonline"
  },
  { 
    title: "Global Markets Update", 
    image: "https://images.unsplash.com/photo-1526303328184-9758f57165be?q=80&w=800&auto=format&fit=crop",
    link: "https://www.youtube.com/@zerodhaonline"
  }
];

const ZERODHA_CHANNEL_URL = "https://www.youtube.com/@zerodhaonline";
const VARSITY_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLfS6_4M6qR6S2m1C9PezqYyA0zI7ZJ2V0";
const KITE_TUTORIALS_URL = "https://www.youtube.com/playlist?list=PLfS6_4M6qR6RL8H7jQpW6R8fX8T0n9Z6E";

export const VarsityView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Modules');
  const filters = ['All Modules', 'Beginner', 'Intermediate', 'Advanced', 'Technical Analysis', 'Options Strategies'];

  return (
    <div className="bg-[#f6f8f6] dark:bg-slate-950 min-h-full animate-in fade-in duration-500 pb-20">
      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 py-12 flex flex-col gap-16">
        
        {/* Hero Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[#13ec37] font-extrabold tracking-widest uppercase text-xs">Educational Hub</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Knowledge is your best <span className="text-[#13ec37] italic">investment.</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mt-4 font-medium">
              Master the financial markets with our curated guides, live sessions, and expert-led video modules.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#13ec37] text-lg">school</span>
              <span className="text-sm font-bold">120+ Modules</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#13ec37] text-lg">play_circle</span>
              <span className="text-sm font-bold">50+ Hours of Video</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[#13ec37] text-lg">description</span>
              <span className="text-sm font-bold">Free PDF Guides</span>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide border-b border-slate-200 dark:border-slate-800">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeFilter === filter 
                  ? 'bg-slate-900 dark:bg-[#13ec37] text-white dark:text-slate-900 shadow-md scale-105' 
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* PDF Modules Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Featured PDF Guides</h3>
            <button className="text-[#13ec37] text-sm font-bold flex items-center gap-1.5 group">
              View All <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PDF_GUIDES.map(guide => (
              <div key={guide.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-7xl text-slate-400/50 dark:text-slate-600/50 group-hover:scale-110 transition-transform duration-700">{guide.icon}</span>
                  </div>
                  <div className={`absolute top-5 left-5 ${guide.badgeColor} text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider`}>
                    {guide.level}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-[#13ec37] transition-colors">{guide.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-medium">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-6">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="material-symbols-outlined text-lg">description</span>
                      <span className="text-[11px] font-black uppercase tracking-tight">{guide.pages} Pages • PDF</span>
                    </div>
                    <button className="bg-[#13ec37] hover:bg-[#13ec37]/90 text-slate-900 text-xs font-black py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#13ec37]/20">
                      <span className="material-symbols-outlined text-sm">download</span> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Section */}
        <section className="bg-slate-900 dark:bg-slate-950 rounded-[40px] p-8 lg:p-16 relative overflow-hidden border border-slate-800 shadow-3xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <svg className="w-64 h-64 fill-white" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="bg-[#13ec37] p-2 rounded-xl">
                  <span className="material-symbols-outlined text-slate-900 text-3xl font-bold">smart_display</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Watch & Learn on YouTube</h3>
              </div>
              <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed">
                Get real-time market insights and strategy breakdowns from the official Zerodha channel.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                 <a href={VARSITY_PLAYLIST_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 transition-all flex items-center gap-2">
                    Varsity Series
                 </a>
                 <a href={KITE_TUTORIALS_URL} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 transition-all flex items-center gap-2">
                    Kite Tutorials
                 </a>
              </div>
            </div>
            <a href={ZERODHA_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-red-600/20 flex items-center gap-3 active:scale-95">
              <span className="material-symbols-outlined">subscriptions</span>
              Visit Official Channel
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {VIDEOS.map((video, idx) => (
              <a key={idx} href={video.link} target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer shadow-lg block">
                <img className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" src={video.image} alt={video.title} />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-4 group-hover:bg-[#13ec37] transition-all group-hover:scale-110 duration-300">
                    <span className="material-symbols-outlined text-white text-3xl group-hover:text-slate-900 font-bold">play_arrow</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-black truncate drop-shadow-lg">{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="flex flex-col items-center text-center bg-[#13ec37]/10 dark:bg-[#13ec37]/5 rounded-[40px] p-12 lg:p-20 border border-[#13ec37]/20">
          <div className="bg-[#13ec37] p-5 rounded-[24px] mb-8 shadow-xl shadow-[#13ec37]/30">
            <span className="material-symbols-outlined text-slate-900 text-5xl">mail</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Stay Ahead of the Curve</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg mt-2 mb-10 max-w-md font-medium">
            Get the latest educational content and weekly market guides delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input 
              className="flex-1 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 focus:ring-4 focus:ring-[#13ec37]/20 focus:border-[#13ec37] outline-none transition-all font-bold text-sm" 
              placeholder="Enter your email address" 
              type="email" 
            />
            <button className="bg-[#13ec37] hover:bg-[#13ec37]/90 text-slate-900 font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-[#13ec37]/20 active:scale-95">
              Subscribe Now
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">No spam. Only high-value insights. Unsubscribe anytime.</p>
        </section>

      </main>
    </div>
  );
};
