import React from 'react';
import { TrendingUp, Building2, Bot, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import ProjectLauncher from '../ProjectLauncher';
import Bookmarks from '../Bookmarks';
import QuickNotes from '../QuickNotes';

export default function HubView({ onNavigate }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Bento Grid Top Summary Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bento 1: Stock Market Spotlight */}
        <div 
          onClick={() => onNavigate('stocks')}
          className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                KOSPI +1.10%
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
              국내 & 미국 주식 현황
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              삼성전자, SK하이닉스, 엔비디아, 테슬라 실시간 시세 및 지수 모니터링
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
            <span>시세 대시보드 바로가기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 2: Real Estate Spotlight */}
        <div 
          onClick={() => onNavigate('realestate')}
          className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Building2 className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                국토부 실거래가
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
              호갱노노 부동산 분석
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              반포 아크로리버파크(43.5억), 헬리오시티(22.8억) 등 갭투자 및 전세가율 분석
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
            <span>실거래가 분석 바로가기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 3: AI Chat Spotlight */}
        <div 
          onClick={() => onNavigate('aichat')}
          className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer group flex flex-col justify-between bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-indigo-950/20"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Bot className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 영구 기록
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
              JK AI & 기록 채팅
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              자산 분석, 시장 인사이트 질의응답 및 타임스탬프 영구 아카이빙
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
            <span>AI 대화방 열기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* JK Projects & Labs */}
      <ProjectLauncher />

      {/* Bookmarks & Quick Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Bookmarks />
        <QuickNotes />
      </div>
    </div>
  );
}
