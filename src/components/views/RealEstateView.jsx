import React, { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, TrendingUp, TrendingDown, MapPin, 
  Calculator, Calendar, ExternalLink, X, School, Train, Sparkles, Plus, 
  Star, Navigation as NavIcon, Compass, Sliders, RotateCcw
} from 'lucide-react';
import { APARTMENTS_MASTER, CURRENT_YEAR } from '../../data/allApartmentsMaster';
import { DISTRICT_COORDINATES } from '../../data/realEstateData';

export default function RealEstateView() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'gpsMap'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);

  // Default Filter state requested by user:
  // "기본 필터 걸려있는거는(풀수있음) 9억~12억대 서울, 경기권 아파트로 볼수있게하면 될듯 연식 32년 아래로 아파트 매물은 일단 다 볼수있게"
  const [regionScope, setRegionScope] = useState('seoul_gyeonggi'); // 'all' | 'seoul_gyeonggi' | 'seoul' | 'gyeonggi'
  const [minPrice, setMinPrice] = useState(90000); // 9억 (1억~50억)
  const [maxPrice, setMaxPrice] = useState(120000); // 12억
  const [maxAge, setMaxAge] = useState(32); // 32년 이하
  const [onlyMyApartments, setOnlyMyApartments] = useState(false);

  // My Favorites (Watchlist)
  const [myApartments, setMyApartments] = useState(() => {
    const saved = localStorage.getItem('jk_my_apartments');
    return saved ? JSON.parse(saved) : ['apt-target-1', 'apt-target-2'];
  });

  const [apartments] = useState(APARTMENTS_MASTER);

  useEffect(() => {
    localStorage.setItem('jk_my_apartments', JSON.stringify(myApartments));
  }, [myApartments]);

  const toggleFavorite = (e, aptId) => {
    e.stopPropagation();
    if (myApartments.includes(aptId)) {
      setMyApartments(myApartments.filter((id) => id !== aptId));
    } else {
      setMyApartments([...myApartments, aptId]);
    }
  };

  // Reset to see all without constraints
  const resetAllFilters = () => {
    setRegionScope('all');
    setMinPrice(10000); // 1억
    setMaxPrice(500000); // 50억+
    setMaxAge(50); // 제한 없음
    setOnlyMyApartments(false);
    setSearchTerm('');
  };

  // Apply default recommended 9~12억 preset
  const applyDefaultPreset = () => {
    setRegionScope('seoul_gyeonggi');
    setMinPrice(90000);
    setMaxPrice(120000);
    setMaxAge(32);
    setOnlyMyApartments(false);
  };

  const isDefaultPresetActive =
    regionScope === 'seoul_gyeonggi' &&
    minPrice === 90000 &&
    maxPrice === 120000 &&
    maxAge === 32 &&
    !onlyMyApartments;

  // Filter apartments
  const filteredApartments = apartments.filter((apt) => {
    // Search
    const matchSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.dong.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.roadNm && apt.roadNm.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;

    // MY 종목 필터
    if (onlyMyApartments && !myApartments.includes(apt.id)) return false;

    // Region scope
    if (regionScope === 'seoul_gyeonggi' && apt.city !== 'seoul' && apt.city !== 'gyeonggi') return false;
    if (regionScope === 'seoul' && apt.city !== 'seoul') return false;
    if (regionScope === 'gyeonggi' && apt.city !== 'gyeonggi') return false;

    // Price range (minPrice ~ maxPrice)
    if (apt.recentPriceNum < minPrice || apt.recentPriceNum > maxPrice) return false;

    // Building age (연식: 현재연도 2026 - 준공연도 <= maxAge)
    const age = CURRENT_YEAR - apt.builtYear;
    if (age > maxAge) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Filter and Search Control Center */}
      <div className="glass-panel rounded-3xl p-5 md:p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  전국 아파트 실거래가 & 갭투자 분석
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {filteredApartments.length}개 단지 매칭
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1억부터 50억까지 전 단지 실시간 조회 &bull; 국토부/CODEF API 규격 및 네이버 부동산 연동
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                단지 카드
              </button>
              <button
                onClick={() => setViewMode('gpsMap')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'gpsMap'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>GPS 구역 맵</span>
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="단지명, 법정동, 구 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 w-44 md:w-56"
              />
            </div>
          </div>
        </div>

        {/* Preset Notification & Reset Bar */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">현재 필터:</span>
            {isDefaultPresetActive ? (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                🎯 기본 세팅: 서울·경기권 &bull; 9억~12억 &bull; 연식 32년 이하
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                {regionScope === 'all' ? '전국 전체' : '서울·경기'} &bull; {(minPrice/10000).toFixed(0)}억~{(maxPrice/10000).toFixed(0)}억 &bull; 연식 {maxAge}년 이하
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isDefaultPresetActive && (
              <button
                onClick={applyDefaultPreset}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-[11px] font-bold border border-indigo-500/30 transition-all"
              >
                9~12억 기본필터 적용
              </button>
            )}
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>전체보기 (필터 해제)</span>
            </button>
          </div>
        </div>

        {/* Detailed Slider & Selectors */}
        <div className="pt-2 border-t border-slate-800/60 space-y-3 text-xs">
          {/* Region Tabs & MY 단지 */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setOnlyMyApartments(!onlyMyApartments)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                onlyMyApartments
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyMyApartments ? 'fill-slate-950' : 'fill-amber-300'}`} />
              <span>MY 단지 ({myApartments.length})</span>
            </button>

            <span className="text-slate-600">|</span>

            {[
              { id: 'seoul_gyeonggi', label: '수도권 (서울+경기)' },
              { id: 'seoul', label: '서울 전역' },
              { id: 'gyeonggi', label: '경기권' },
              { id: 'all', label: '전국 전체' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => {
                  setRegionScope(reg.id);
                  setOnlyMyApartments(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  regionScope === reg.id && !onlyMyApartments
                    ? 'bg-purple-600 text-white font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Sliders: Min Price, Max Price, and Age */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Min Price Slider (from 1억) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 font-medium">최소 매매가:</span>
                <span className="font-mono font-bold text-slate-200">
                  {minPrice <= 10000 ? '1억원부터' : `${(minPrice / 10000).toFixed(1)}억원`}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="5000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>1억</span>
                <span>9억</span>
                <span>15억</span>
                <span>30억</span>
              </div>
            </div>

            {/* Max Price Slider (up to 50억+) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 font-medium">최대 매매가:</span>
                <span className="font-mono font-bold text-rose-400">
                  {maxPrice >= 500000 ? '50억 이상 (전체)' : `${(maxPrice / 10000).toFixed(1)}억원`}
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>2억</span>
                <span>12억</span>
                <span>25억</span>
                <span>50억+</span>
              </div>
            </div>

            {/* Age Filter (연식 제한) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 font-medium">아파트 연식:</span>
                <span className="font-mono font-bold text-indigo-400">
                  {maxAge >= 50 ? '전체 연식 (제한 없음)' : `${maxAge}년 이하 (${CURRENT_YEAR - maxAge}년 이후 준공)`}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>5년(신축)</span>
                <span>15년</span>
                <span>32년(기본)</span>
                <span>제한없음</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GPS 구역 인터랙티브 맵 레이더 뷰 */}
      {viewMode === 'gpsMap' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-slate-200">
                GPS 좌표 레이더 & 구역별 단지 매칭
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              구역 클릭 시 해당 위치의 단지 리스트가 필터링됩니다
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(DISTRICT_COORDINATES).map(([distName, coords]) => {
              const countInDist = apartments.filter(a => a.district.includes(distName)).length;
              return (
                <div
                  key={distName}
                  onClick={() => {
                    setSearchTerm(distName);
                    setViewMode('list');
                  }}
                  className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                      {distName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300">
                      {countInDist}개 단지
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    위도 {coords.lat.toFixed(4)}, 경도 {coords.lng.toFixed(4)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Apartment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApartments.map((apt) => {
          const isFav = myApartments.includes(apt.id);
          const age = CURRENT_YEAR - apt.builtYear;

          return (
            <div
              key={apt.id}
              onClick={() => setSelectedApt(apt)}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-100 group-hover:text-purple-300 transition-colors">
                      {apt.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{apt.district} {apt.dong}</span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-indigo-400 font-mono">연식 {age}년차 ({apt.builtYear}년)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleFavorite(e, apt.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav
                          ? 'text-amber-400 hover:text-amber-300 bg-amber-500/10'
                          : 'text-slate-600 hover:text-slate-300 bg-slate-800/50'
                      }`}
                      title={isFav ? 'MY 단지에서 해제' : 'MY 단지에 추가'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>

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
                </div>

                {/* Badges / Specs */}
                <div className="flex flex-wrap items-center gap-1.5 my-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700/60">
                    {apt.exclusiveArea}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-[10px] font-medium text-indigo-300 border border-indigo-500/20 font-mono">
                    {apt.pyeongPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-[10px] font-medium text-purple-300 border border-purple-500/20">
                    {apt.totalHouseholds}
                  </span>
                </div>

                {/* Price Details Box */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2 my-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">최근 실거래가</span>
                    <span className="text-lg font-mono font-black text-rose-400">
                      {apt.recentPrice}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">전세 실거래가</span>
                    <span className="font-mono font-bold text-slate-200">{apt.jeonsePrice}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-800/80">
                    <span className="text-indigo-400 font-semibold flex items-center gap-1">
                      <Calculator className="w-3 h-3" /> 갭투자 필요자금
                    </span>
                    <span className="font-mono font-extrabold text-indigo-300">{apt.gapPrice}</span>
                  </div>

                  {/* Jeonse rate progress */}
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>전세가율</span>
                      <span className="font-mono font-bold text-slate-300">{apt.jeonseRate}%</span>
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

              {/* Footer GPS Info & Detail Action */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="text-slate-500 truncate max-w-[170px]">
                  {apt.dealDate}
                </span>
                <span className="text-purple-400 group-hover:underline flex items-center gap-1 font-semibold">
                  CODEF 상세 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apartment Detail Analysis Drawer/Modal */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-slate-700 bg-slate-950/95 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {selectedApt.district} {selectedApt.dong}
                  </span>
                  <span className="text-xs text-slate-400">{selectedApt.builtYear}년 준공 (연식 {CURRENT_YEAR - selectedApt.builtYear}년차) &bull; {selectedApt.totalHouseholds}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-100 mt-1 flex items-center gap-2">
                  <span>{selectedApt.name}</span>
                  <button
                    onClick={(e) => toggleFavorite(e, selectedApt.id)}
                    className="p-1 text-amber-400"
                    title="MY 단지 토글"
                  >
                    <Star className={`w-5 h-5 ${myApartments.includes(selectedApt.id) ? 'fill-amber-400' : ''}`} />
                  </button>
                </h2>
              </div>

              <button
                onClick={() => setSelectedApt(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Price Comparison */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">최근 매매 실거래가</div>
                <div className="text-2xl font-mono font-black text-rose-400 mt-1">
                  {selectedApt.recentPrice}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">{selectedApt.dealDate}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">최근 전세 실거래가</div>
                <div className="text-2xl font-mono font-black text-slate-200 mt-1">
                  {selectedApt.jeonsePrice}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">전세가율 {selectedApt.jeonseRate}%</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <div className="text-xs text-indigo-300 font-medium flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-indigo-400" /> 갭투자 필요자금
                </div>
                <div className="text-2xl font-mono font-black text-indigo-300 mt-1">
                  {selectedApt.gapPrice}
                </div>
                <div className="text-[10px] text-indigo-400/80 mt-1">매매가 - 전세가 기준</div>
              </div>
            </div>

            {/* GPS & Address & CODEF Specification */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>단지 위치 & CODEF 공공데이터 규격</span>
                <span className="font-mono text-[10px] text-indigo-400">{selectedApt.codefRef}</span>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{selectedApt.roadNm} (법정동코드: {selectedApt.bjdCode})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <NavIcon className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span>GPS 좌표: 위도 {selectedApt.lat}, 경도 {selectedApt.lng}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-300">
                  <Train className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{selectedApt.station}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <School className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{selectedApt.school}</span>
                </div>
              </div>
            </div>

            {/* Direct Naver Real Estate CTA */}
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
              <a
                href={selectedApt.naverLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
              >
                <span>네이버 부동산 실시간 매물 보러가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
