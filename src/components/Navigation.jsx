import React from 'react';
import { LayoutDashboard, TrendingUp, Building2, Newspaper, Bot, Sparkles } from 'lucide-react';

export default function Navigation({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'hub', label: '종합 관제탑', icon: LayoutDashboard },
    { id: 'stocks', label: '주식', icon: TrendingUp },
    { id: 'realestate', label: '부동산 분석', icon: Building2 },
    { id: 'news', label: '주요 뉴스', icon: Newspaper, isHot: true },
    { id: 'aichat', label: 'JK AI & 기록 채팅', icon: Bot, isNew: true },
  ];

  return (
    <nav className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-2xl mb-6 shadow-xl shadow-black/40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 whitespace-nowrap relative ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span>{tab.label}</span>

            {tab.isHot && (
              <span className="flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                속보
              </span>
            )}

            {tab.isNew && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
