import React from 'react';
import { Cpu, Terminal, Compass, CloudLightning } from 'lucide-react';

export default function StatsBanner() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="glass-panel rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">플랫폼 상태</div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
              <span>정상 가동</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">AI 페어 프로그래밍</div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">Gemini 3.8 연동</div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CloudLightning className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">배포 호스팅</div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">Vercel 무료 준비</div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">접속 모드</div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">어디서든 접속 가능</div>
          </div>
        </div>
      </div>
    </div>
  );
}

