import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import ProjectLauncher from './components/ProjectLauncher';
import Bookmarks from './components/Bookmarks';
import QuickNotes from './components/QuickNotes';
import AccessGate from './components/AccessGate';
import { Rocket, Heart } from 'lucide-react';

export default function App() {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col justify-between selection:bg-indigo-500 selection:text-white animate-fadeIn">
      {/* Background ambient gradient glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1">
        {/* Top Header */}
        <Header onLock={handleLock} />

        {/* Status / Quick Stats */}
        <StatsBanner />

        {/* Main Content Layout */}
        <div className="space-y-6">
          {/* Projects & Launcher */}
          <ProjectLauncher />

          {/* Bookmarks & Quick Notes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Bookmarks />
            <QuickNotes />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <Rocket className="w-3.5 h-3.5 text-indigo-400" />
          <span>JK LAND &bull; Personal Web Portal v1.0</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Protected Area &bull; Built with Antigravity</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
        </div>
      </footer>
    </div>
  );
}
