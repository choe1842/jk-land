import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Globe, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6']
    });
  };

  const formattedDate = time.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  });

  const formattedTime = time.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <header className="glass-panel rounded-2xl p-6 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div 
            onClick={triggerConfetti}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="클릭해보세요! 축하 효과가 터집니다 🎉"
          >
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                JK LAND
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Online
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">
              JK의 개인 웹 허브 & 클라우드 워크스페이스
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-4">
          {/* Clock widget */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm">
            <Clock className="w-4 h-4 text-indigo-400" />
            <div className="text-right">
              <div className="font-mono font-bold text-slate-200 tracking-wider">
                {formattedTime}
              </div>
              <div className="text-xs text-slate-400">
                {formattedDate}
              </div>
            </div>
          </div>

          {/* Quick Celebration Button */}
          <button
            onClick={triggerConfetti}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-md shadow-indigo-600/25 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate!</span>
          </button>
        </div>
      </div>
    </header>
  );
}

