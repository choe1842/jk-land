import React, { useState } from 'react';
import { Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AiSearchView() {
  const [cashAsset, setCashAsset] = useState(15000); 
  const [stockAsset, setStockAsset] = useState(8000); 
  const [targetRealEstatePrice, setTargetRealEstatePrice] = useState(115000); 
  const [monthlySavings, setMonthlySavings] = useState(250); 
  const [targetYears, setTargetYears] = useState(3); 

  const totalCurrentAsset = cashAsset + stockAsset;
  const estimatedSavings = monthlySavings * 12 * targetYears;
  const expectedInvestmentReturn = stockAsset * Math.pow(1.08, targetYears) - stockAsset;
  const futureTotalAsset = totalCurrentAsset + estimatedSavings + expectedInvestmentReturn;
  return (
    <div className="space-y-6 animate-fadeIn font-sans max-w-5xl mx-auto">
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              JK LAND AI Intelligence v3.5
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            내집 마련 & 자산 갈아타기 타임머신 시뮬레이터
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            현재 보유 자산과 저축액, 주식 복리 수익률을 기반으로 서울·수도권 대장 아파트 진입 가능성을 AI가 진단합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" /> 자산 및 목표 설정
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">현재 현금/예적금 (만원)</label>
              <input type="number" value={cashAsset} onChange={(e) => setCashAsset(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">현재 주식 자산 (만원)</label>
              <input type="number" value={stockAsset} onChange={(e) => setStockAsset(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white" />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">목표 아파트 매매가 (만원)</label>
              <input type="number" value={targetRealEstatePrice} onChange={(e) => setTargetRealEstatePrice(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-800 rounded-xl text-white" />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> AI 시뮬레이션 진단
          </h3>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">{targetYears}년 뒤 예상 총자산</div>
            <div className="text-2xl font-mono font-black text-indigo-400">{(futureTotalAsset / 10000).toFixed(2)}억 원</div>
          </div>
          <div className={`p-4 rounded-2xl border ${isAchievable ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'} text-xs`}>
            {isAchievable ? '축하합니다! 목표 단지 매수가 가능합니다.' : `약 ${(Math.abs(gapNeeded) / 10000).toFixed(2)}억 원의 추가 자산 형성이 필요합니다.`}
          </div>
        </div>
      </div>
    </div>
  );
}
  const gapNeeded = targetRealEstatePrice - futureTotalAsset;
  const isAchievable = gapNeeded <= 0;