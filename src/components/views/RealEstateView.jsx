import React, { useState } from 'react';
import { Building2, Search, Plus, Filter, TrendingUp, TrendingDown, MapPin, Calculator, Calendar } from 'lucide-react';
import { INITIAL_REAL_ESTATE } from '../../data/mockData';

export default function RealEstateView() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [apartments, setApartments] = useState(() => {
    const saved = localStorage.getItem('jk_real_estate');
    return saved ? JSON.parse(saved) : INITIAL_REAL_ESTATE;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState('84㎡ (34평)');
  const [price, setPrice] = useState('');
  const [jeonse, setJeonse] = useState('');

  const filteredApartments = apartments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.region.toLowerCase().includes(searchTerm.toLowerCase());

    if (regionFilter === 'all') return matchesSearch;
    if (regionFilter === 'gangnam') return matchesSearch && (apt.region.includes('강남') || apt.region.includes('서초') || apt.region.includes('송파'));
    if (regionFilter === 'mayong') return matchesSearch && (apt.region.includes('마포') || apt.region.includes('용산') || apt.region.includes('성동'));
    if (regionFilter === 'gyeonggi') return matchesSearch && (apt.region.includes('분당') || apt.region.includes('판교') || apt.region.includes('경기'));
    return matchesSearch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    const newApt = {
      id: Date.now(),
      name: name.trim(),
      region: region.trim() || '서울',
      exclusiveArea: area,
      recentPrice: price.trim(),
      previousPrice: '직전가 없음',
      changeDiff: '신규등록',
      isUp: true,
      jeonsePrice: jeonse.trim() || '정보 없음',
      gapPrice: '직접 계산',
      jeonseRate: 50,
      dealDate: '2026.10',
      floor: '기준층',
      totalHouseholds: '단지정보',
      constructedYear: 2020,
      tags: ['관심단지']
    };

    const updated = [newApt, ...apartments];
    setApartments(updated);
    localStorage.setItem('jk_real_estate', JSON.stringify(updated));
    setName('');
    setRegion('');
    setPrice('');
    setJeonse('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Controls & Region Selector */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>호갱노노 실거래가 & 갭투자 분석</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  국토부 실거래가 기준
                </span>
              </h2>
              <p className="text-xs text-slate-400">수도권 핵심 대장 아파트 최근 실거래가 및 갭 분석</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="단지명 또는 지역 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-48 md:w-60"
              />
            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold whitespace-nowrap transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>관심단지 등록</span>
            </button>
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/60 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Filter className="w-3 h-3" /> 지역:
          </span>
          {[
            { id: 'all', label: '전체 단지' },
            { id: 'gangnam', label: '강남 3구 (서초/강남/송파)' },
            { id: 'mayong', label: '마용성 (마포/용산/성동)' },
            { id: 'gyeonggi', label: '경기 판교/분당' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setRegionFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                regionFilter === pill.id
                  ? 'bg-purple-600 text-white font-bold shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Apartment Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="glass-panel rounded-2xl p-4 border border-purple-500/40 bg-slate-900/95 space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>새로운 관심 단지 실거래가 등록</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="단지명 (예: 압구정현대)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="지역 (예: 서울 강남구 압구정동)"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="최근 매매가 (예: 45억)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="최근 전세가 (예: 18억)"
              value={jeonse}
              onChange={(e) => setJeonse(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
            >
              등록 완료
            </button>
          </div>
        </form>
      )}

      {/* Real Estate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApartments.map((apt) => (
          <div
            key={apt.id}
            className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base font-extrabold text-slate-100">
                    {apt.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span>{apt.region}</span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    apt.isUp
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {apt.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{apt.changeDiff}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300 border border-slate-700/60">
                  {apt.exclusiveArea}
                </span>
                {apt.tags?.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-purple-500/10 text-[10px] font-medium text-purple-300 border border-purple-500/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Price Details Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 my-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400 font-medium">최근 실거래가</span>
                  <span className="text-lg font-mono font-black text-rose-400">
                    {apt.recentPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">최근 전세가</span>
                  <span className="font-mono font-bold text-slate-200">{apt.jeonsePrice}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-800/80">
                  <span className="text-indigo-400 font-semibold flex items-center gap-1">
                    <Calculator className="w-3 h-3" /> 갭투자 필요자금
                  </span>
                  <span className="font-mono font-extrabold text-indigo-300">{apt.gapPrice}</span>
                </div>

                {/* Jeonse rate bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>전세가율</span>
                    <span className="font-mono font-bold text-slate-400">{apt.jeonseRate}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 mt-0.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-1 rounded-full"
                      style={{ width: `${apt.jeonseRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {apt.dealDate} ({apt.floor})
              </span>
              <span>{apt.totalHouseholds}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
