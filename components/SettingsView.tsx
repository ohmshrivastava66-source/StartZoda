
import React, { useState } from 'react';
import { User, UserSettings } from '../types';
import { UserCircle, Shield, Bell, Smartphone, Camera, Save, AlertCircle } from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState<number>(user.age);
  const [notifications, setNotifications] = useState(user.settings?.notifications ?? true);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    setError(null);
    
    if (age < 16) {
      setError("Minimum age for a trading account is 16.");
      return;
    }

    onUpdateUser({ 
      name, 
      age,
      settings: { ...user.settings, notifications } as UserSettings 
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-[#13ec37]/10 p-3 rounded-2xl">
          <UserCircle size={32} className="text-[#13ec37]" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 font-medium">Manage your StartZoda profile and platform preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-1">
          {['Profile', 'Security', 'Notifications', 'Preferences'].map((tab, idx) => (
            <button
              key={tab}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                idx === 0 ? 'bg-white text-[#4184f3] shadow-sm border border-slate-100' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-800">Personal Information</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`} alt="avatar" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-zinc-900">{user.id}</h3>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Trading Account ID</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border-slate-100 rounded-xl font-bold text-zinc-800 focus:ring-2 focus:ring-[#4184f3]/20 focus:border-[#4184f3] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age</label>
                    <input
                      type="number"
                      min="1"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                      className={`w-full px-4 py-3 bg-slate-50 border-slate-100 rounded-xl font-bold text-zinc-800 focus:ring-2 focus:ring-[#4184f3]/20 transition-all ${age < 16 ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'focus:border-[#4184f3]'}`}
                    />
                  </div>
                </div>
                
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 animate-in slide-in-from-top duration-200">
                    <AlertCircle size={16} />
                    <span className="text-xs font-bold">{error}</span>
                  </div>
                )}

                <div className="space-y-1.5 opacity-50">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address (Read Only)</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl font-bold text-zinc-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-800">Platform Preferences</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="bg-blue-50 p-2.5 rounded-xl">
                    <Bell size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800">Push Notifications</h4>
                    <p className="text-xs text-slate-400 font-medium">Get real-time alerts for executed orders.</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-[#13ec37]' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex gap-4">
                  <div className="bg-orange-50 p-2.5 rounded-xl">
                    <Shield size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800">Two-Factor Auth</h4>
                    <p className="text-xs text-slate-400 font-medium">Secure your virtual funds with 2FA.</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">Disabled</span>
              </div>
            </div>
          </section>

          {/* Save Action */}
          <div className="flex items-center justify-end gap-4">
            {isSaved && (
              <span className="text-sm font-bold text-[#13ec37] animate-in slide-in-from-right duration-300">
                Changes saved successfully!
              </span>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#4184f3] hover:bg-blue-600 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
