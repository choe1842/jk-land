import React, { useState } from 'react';
import Header from './components/Header';
import MarketTicker from './components/MarketTicker';
import Navigation from './components/Navigation';
import RealEstateView from './components/views/RealEstateView';
import StockMarketView from './components/views/StockMarketView';
import NewsView from './components/views/NewsView';
import CommunityChatView from './components/views/CommunityChatView';
import AiSearchView from './components/views/AiSearchView';
import AccessGate from './components/AccessGate';
import { Rocket, Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('realestate');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return (
      localStorage.getItem('jk_auth_pass') === 'true' ||
      sessionStorage.getItem('jk_auth_pass') === 'true'
    );
  });

  const handleLock = () => {
    localStorage.removeItem('jk_auth_pass');
    sessionStorage.removeItem('jk_auth_pass');
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <AccessGate onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white antialiased font-sans">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))] pointer-events-none" />

      {/* Top Running Market Ticker */}
      <MarketTicker />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 relative z-10 flex-1">
        {/* Header with lock & time */}
        <Header onLock={handleLock} />

        {/* Global 5-Core Navigation Bar */}
        <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Dynamic Core Views */}
        <main className="mb-12">
          {activeTab === 'realestate' && <RealEstateView />}
          {activeTab === 'stocks' && <StockMarketView />}
          {activeTab === 'news' && <NewsView />}
          {activeTab === 'chat' && <CommunityChatView />}
          {activeTab === 'aiSearch' && <AiSearchView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-4 md:px-8 py-6 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 font-mono">
        <div className="flex items-center gap-2">
          <Rocket className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-slate-300">JK LAND Suite v3.0</span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" /> Gate Protected
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-sans">
          <span>Crafted with Web Wizard &bull; Antigravity</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline ml-0.5" />
        </div>
      </footer>
    </div>
  );
}
