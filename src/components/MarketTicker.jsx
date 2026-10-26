import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { INDICES } from '../data/mockData';

export default function MarketTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-slate-800/80 bg-slate-950/70 backdrop-blur-md py-2.5 mb-6">
      <div className="flex items-center gap-8 animate-none sm:justify-around overflow-x-auto no-scrollbar px-4">
        {INDICES.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 flex-shrink-0 text-xs">
            <span className="font-semibold text-slate-300">{item.name}</span>
            <span className="font-mono font-bold text-slate-100">{item.value}</span>
            <span
              className={`flex items-center gap-0.5 font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded ${
                item.isUp
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}
            >
              {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.percent}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

