
import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  UserCircle, 
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'market', label: 'Market', icon: BarChart3 },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-30">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="text-gray-900">
          <Logo size={32} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tighter">STARTZODA</h1>
          <p className="text-[8px] font-bold text-gray-400 tracking-widest uppercase -mt-1">By Zerodha</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentPath === item.id 
                ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
