import React from 'react';
import { TrendingUp, Building2, Bot, ArrowRight, Sparkles } from 'lucide-react';
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
              <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                KOSPI 2,612 ▲
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
              주식 관제 & 종목 분석
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              삼성전자, SK하이닉스, 엔비디아, 애플 등 한·미 주요 종목 실시간 검색 및 AI 지능형 분석
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
            <span>주식 관제실 열기</span>
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
              <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Building2 className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                네이버 부동산 연동
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
              부동산 분석 & 갭투자
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              서울/경기/인천/부산 지역별, 금액대별 실거래가, 전세가율 및 갭투자 필요자금 필터링
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-semibold">
            <span>부동산 대시보드 열기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Bento 3: AI Chat Spotlight */}
        <div 
          onClick={() => onNavigate('aichat')}
          className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer group flex flex-col justify-between bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/30"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Bot className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 영구 보존
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
              JK AI & 기록 채팅
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              시장 질문, 업무 메모, 대화 내용이 로컬에 영구 저장되는 개인 AI 어시스턴트
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
