import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ShieldAlert, ArrowRight, Delete, KeyRound } from 'lucide-react';
import confetti from 'canvas-confetti';

const ACCESS_CODE = '1026';

export default function AccessGate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Auto verify when 4 digits entered
  useEffect(() => {
    if (code.length === 4) {
      if (code === ACCESS_CODE) {
        handleSuccess();
      } else {
        triggerError();
      }
    }
  }, [code]);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        if (code.length < 4) {
          setCode((prev) => prev + e.key);
          setError(false);
        }
      } else if (e.key === 'Backspace') {
        setCode((prev) => prev.slice(0, -1));
        setError(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code]);

  const handleSuccess = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#6366f1', '#10b981', '#a855f7']
    });

    if (rememberMe) {
      localStorage.setItem('jk_auth_pass', 'true');
    } else {
      sessionStorage.setItem('jk_auth_pass', 'true');
    }

    setTimeout(() => {
      onUnlock();
    }, 400);
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => {
      setCode('');
      setError(false);
    }, 700);
  };

  const handleKeypadPress = (num) => {
    if (code.length < 4) {
      setCode((prev) => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setCode((prev) => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative z-10 text-center animate-fadeIn">
        {/* Lock Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-5 relative">
          <div className="absolute inset-0 rounded-2xl bg-indigo-400 animate-ping opacity-20" />
          <Lock className="w-8 h-8 text-white stroke-[2.2]" />
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white mb-1">
          JK LAND
        </h1>
        <p className="text-xs text-slate-400 mb-6 flex items-center justify-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
          <span>보안 접근 게이트 &bull; 코드를 입력하세요</span>
        </p>

        {/* 4 Digit Indicators */}
        <div className={`flex justify-center gap-4 mb-6 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((index) => {
            const isFilled = code.length > index;
            return (
              <div
                key={index}
                className={`w-12 h-14 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold transition-all duration-200 border ${
                  error
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400 shadow-lg shadow-rose-500/20'
                    : isFilled
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-md shadow-indigo-500/20 scale-105'
                    : 'border-slate-800 bg-slate-900/60 text-slate-600'
                }`}
              >
                {isFilled ? '●' : '·'}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium mb-4 animate-fadeIn">
            <ShieldAlert className="w-4 h-4" />
            <span>코드가 올바르지 않습니다</span>
          </div>
        )}

        {/* Numeric Keypad for Mobile and Touch */}
        <div className="grid grid-cols-3 gap-2.5 mb-5 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypadPress(num)}
              className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-95 text-lg font-bold text-slate-200 transition-all shadow-sm"
            >
              {num}
            </button>
          ))}
          <div className="h-12" /> {/* empty space */}
          <button
            onClick={() => handleKeypadPress('0')}
            className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-95 text-lg font-bold text-slate-200 transition-all shadow-sm"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-95 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm"
            title="지우기"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Remember device checkbox */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-900">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 focus:outline-none cursor-pointer"
          />
          <label htmlFor="rememberMe" className="cursor-pointer select-none">
            이 기기에서 로그인 유지
          </label>
        </div>
      </div>
    </div>
  );
}

