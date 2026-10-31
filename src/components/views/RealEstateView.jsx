import React, { useState, useEffect } from 'react';
import { 
  Building2, Search, Filter, TrendingUp, TrendingDown, MapPin, 
  Calculator, Calendar, ExternalLink, X, School, Train, Sparkles, Plus, 
  Star, Navigation as NavIcon, Compass, Sliders, RotateCcw, Award, GraduationCap, Flame, BarChart3, ChevronRight
} from 'lucide-react';
import { APT2ME_REAL_ESTATE, APT2ME_SCHOOL_RANKINGS, CURRENT_YEAR } from '../../data/apt2meData';
import { DISTRICT_COORDINATES } from '../../data/realEstateData';

export default function RealEstateView() {
  // apt2.me Sub-view tabs
  const [activeTab, setActiveTab] = useState('recovery'); // 'recovery' (실거래&회복률) | 'gap' (갭투자) | 'ranking' (단지랭킹) | 'school' (학군랭킹) | 'gpsMap' (GPS맵)
  const [rankingSubTab, setRankingSubTab] = useState('p84'); // 'p84' (국평 84) | 'p59' (소형 59) | 'pyeong' (평당가순)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);

  // Filter state (Defaults to 9~12억, Seoul/Gyeonggi, Age <= 32 years as requested)
  const [regionScope, setRegionScope] = useState('seoul_gyeonggi'); // 'all' | 'seoul_gyeonggi' | 'gangnam3' | 'mayong' | 'nodogang' | 'gyeonggi_south' | 'gyeonggi_north'
  const [minPrice, setMinPrice] = useState(90000); // 9억 (10,000 = 1억)
  const [maxPrice, setMaxPrice] = useState(120000); // 12억
  const [maxAge, setMaxAge] = useState(32); // 32년 이하 (1994년 준공 이후)
  const [onlyMyApartments, setOnlyMyApartments] = useState(false);

  // My Favorites (Watchlist) with versioned key
  const [myApartments, setMyApartments] = useState(() => {
    const saved = localStorage.getItem('jk_apt2me_favs_v2');
    return saved ? JSON.parse(saved) : ['apt-target-1', 'apt-target-2', 'apt-high-1'];
  });

  const apartments = APT2ME_REAL_ESTATE;

  useEffect(() => {
    localStorage.setItem('jk_apt2me_favs_v2', JSON.stringify(myApartments));
  }, [myApartments]);

  const toggleFavorite = (e, aptId) => {
    e.stopPropagation();
    if (myApartments.includes(aptId)) {
      setMyApartments(myApartments.filter((id) => id !== aptId));
    } else {
      setMyApartments([...myApartments, aptId]);
    }
  };

  // Reset to full market without constraints (1억 ~ 50억+)
  const resetAllFilters = () => {
    setRegionScope('all');
    setMinPrice(10000); // 1억부터
    setMaxPrice(500000); // 50억+
    setMaxAge(50); // 연식 무제한
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
      apt.roadNm.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchSearch) return false;

    // MY 단지
    if (onlyMyApartments && !myApartments.includes(apt.id)) return false;

    // Region scope
    if (regionScope === 'seoul_gyeonggi' && apt.city !== 'seoul' && apt.city !== 'gyeonggi') return false;
    if (regionScope === 'gangnam3' && apt.regionCategory !== 'gangnam3') return false;
    if (regionScope === 'mayong' && apt.regionCategory !== 'mayong') return false;
    if (regionScope === 'nodogang' && apt.regionCategory !== 'nodogang') return false;
    if (regionScope === 'gyeonggi_south' && apt.regionCategory !== 'gyeonggi_south') return false;
    if (regionScope === 'gyeonggi_north' && apt.regionCategory !== 'gyeonggi_north') return false;

    // Price range (minPrice ~ maxPrice)
    if (apt.dealPriceNum < minPrice || apt.dealPriceNum > maxPrice) return false;

    // Age
    const age = CURRENT_YEAR - apt.builtYear;
    if (age > maxAge) return false;

    // Ranking Sub Tab filter
    if (activeTab === 'ranking') {
      if (rankingSubTab === 'p84' && !apt.sizeCategory.includes('84')) return false;
      if (rankingSubTab === 'p59' && !apt.sizeCategory.includes('59')) return false;
    }

    return true;
  });

  // Sort logic depending on active apt2.me tab
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (activeTab === 'recovery') return b.recoveryRate - a.recoveryRate;
    if (activeTab === 'gap') return a.gapPriceNum - b.gapPriceNum; // 갭 작은 순
    if (activeTab === 'ranking') {
      if (rankingSubTab === 'pyeong') return parseInt(b.pyeongPrice) - parseInt(a.pyeongPrice);
      return b.dealPriceNum - a.dealPriceNum;
    }
    return b.dealPriceNum - a.dealPriceNum;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* apt2.me Brand Header Banner */}
      <div className="glass-panel rounded-3xl p-5 md:p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-heading">
                  apt2.me <span className="text-purple-400 font-medium text-sm">아파트투미</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                  PRO 실거래 랩
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                국토부 실거래가 기반 전고점 회복률, 갭투자 순위, 평형별 랭킹, 특목고·자사고 학군 분석
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="단지명, 법정동 검색 (예: 마포태영, 대흥동)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* apt2.me 5-Core Sub Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-4 border-t border-slate-800/80 text-xs">
          {[
            { id: 'recovery', label: '🔥 실거래 & 회복률', desc: '전고점 대비 회복 현황' },
            { id: 'gap', label: '💰 갭투자 랭킹', desc: '전세낀 매수 순위' },
            { id: 'ranking', label: '🏆 단지 랭킹', desc: '국평/소형/평당가' },
            { id: 'school', label: '🎓 학군 랭킹', desc: '특목·자사고·의대' },
            { id: 'gpsMap', label: '🗺️ GPS 구역 맵', desc: '수도권 좌표 레이더' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preset Status & Filter Controls */}
      <div className="glass-panel rounded-3xl p-5 border border-slate-800 space-y-4 text-xs">
        {/* Preset Notification Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">적용 필터:</span>
            {isDefaultPresetActive ? (
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                🎯 기본 세팅: 수도권(서울·경기) &bull; 9억~12억 &bull; 연식 32년 이하
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 font-medium">
                {regionScope === 'all' ? '전국 전체' : '맞춤 구역'} &bull; {(minPrice/10000).toFixed(1)}억~{(maxPrice/10000).toFixed(1)}억 &bull; 연식 {maxAge}년 이하
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isDefaultPresetActive && (
              <button
                onClick={applyDefaultPreset}
                className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/30 transition-all"
              >
                9~12억 기본세팅 적용
              </button>
            )}
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>전체보기 (1억~50억+ 필터 해제)</span>
            </button>
          </div>
        </div>

        {/* Region Pills & MY 단지 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
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

          <span className="text-slate-700">|</span>

          {[
            { id: 'seoul_gyeonggi', label: '수도권(서울+경기)' },
            { id: 'all', label: '전국 전체' },
            { id: 'mayong', label: '마용성 (마포/용산/성동)' },
            { id: 'gangnam3', label: '강남 3구 (서초/강남/송파)' },
            { id: 'nodogang', label: '노도강 (노원/도봉/강북)' },
            { id: 'gyeonggi_south', label: '경기 남부 (분당/판교/평촌)' },
            { id: 'gyeonggi_north', label: '경기 북부 (일산/킨텍스)' },
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

        {/* Multi-Sliders: Min Price (From 1억), Max Price (up to 50억), Age Slider */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400 font-medium">최소 실거래가:</span>
              <span className="font-mono font-bold text-slate-200">
                {minPrice <= 10000 ? '1억원 (최저)' : `${(minPrice / 10000).toFixed(1)}억원`}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>1억</span>
              <span>5억</span>
              <span>9억</span>
              <span>20억</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400 font-medium">최대 실거래가:</span>
              <span className="font-mono font-bold text-rose-400">
                {maxPrice >= 500000 ? '50억 이상 (전체)' : `${(maxPrice / 10000).toFixed(1)}억원`}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="500000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>3억</span>
              <span>12억</span>
              <span>25억</span>
              <span>50억+</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-400 font-medium">단지 연식:</span>
              <span className="font-mono font-bold text-indigo-400">
                {maxAge >= 50 ? '전체 연식 (제한 없음)' : `${maxAge}년 이하 (${CURRENT_YEAR - maxAge}년 이후)`}
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
              <span>무제한</span>
            </div>
          </div>
        </div>

        {/* Sub-Ranking Switcher if Ranking Tab is active */}
        {activeTab === 'ranking' && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-slate-400 font-semibold">랭킹 기준:</span>
            {[
              { id: 'p84', label: '국민평형 (84㎡ / 30평대) 순위' },
              { id: 'p59', label: '소형평형 (59㎡ / 20평대) 순위' },
              { id: 'pyeong', label: '평당가 (3.3㎡당 시세) 순위' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setRankingSubTab(st.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  rankingSubTab === st.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 4: School District Rankings (학군 랭킹) */}
      {activeTab === 'school' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">
                전국 핵심 명문 학군 & 특목고·의대 진학 랭킹 (apt2.me 학군 데이터)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">2026학년도 대입/고입 기준</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900/90 text-slate-400 font-mono">
                <tr>
                  <th className="p-3.5">순위</th>
                  <th className="p-3.5">학교명</th>
                  <th className="p-3.5">소재지</th>
                  <th className="p-3.5">특목·자사고 진학률</th>
                  <th className="p-3.5">학군 특징 및 의대 진학</th>
                  <th className="p-3.5">연계 고교</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200 font-sans">
                {APT2ME_SCHOOL_RANKINGS.map((sc) => (
                  <tr key={sc.rank} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-purple-400">#{sc.rank}</td>
                    <td className="p-3.5 font-bold text-white flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{sc.name}</span>
                    </td>
                    <td className="p-3.5 text-slate-400">{sc.region}</td>
                    <td className="p-3.5 font-mono font-extrabold text-emerald-400">{sc.specialRate}</td>
                    <td className="p-3.5 font-medium text-slate-300">{sc.snuMedRank}</td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{sc.topHigh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: GPS Map Radar */}
      {activeTab === 'gpsMap' && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-slate-100">
                수도권 핵심 주거벨트 GPS 좌표 레이더
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">구역 클릭 시 리스트로 즉시 필터링</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(DISTRICT_COORDINATES).map(([distName, coords]) => {
              const countInDist = apartments.filter(a => a.district.includes(distName)).length;
              return (
                <div
                  key={distName}
                  onClick={() => {
                    setSearchTerm(distName);
                    setActiveTab('recovery');
                  }}
                  className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all group"
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

      {/* Apartment Cards & apt2.me Analytics Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedApartments.map((apt) => {
          const isFav = myApartments.includes(apt.id);
          const age = CURRENT_YEAR - apt.builtYear;

          return (
            <div
              key={apt.id}
              onClick={() => setSelectedApt(apt)}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer flex flex-col justify-between group relative"
            >
              <div>
                {/* Card Top Title & Badges */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-slate-100 group-hover:text-purple-300 transition-colors">
                        {apt.name}
                      </h3>
                      {apt.isNewHigh && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                          신고가🔥
                        </span>
                      )}
                      {apt.isRebound && !apt.isNewHigh && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          반등
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-purple-400" />
                      <span>{apt.district} {apt.dong}</span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-indigo-400 font-mono font-medium">연식 {age}년 ({apt.builtYear}년 준공)</span>
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
                      title={isFav ? 'MY 단지 해제' : 'MY 단지 추가'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Sub Badges */}
                <div className="flex flex-wrap items-center gap-1.5 my-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700/60 font-mono">
                    {apt.exclusiveArea}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-[10px] font-medium text-indigo-300 border border-indigo-500/20 font-mono">
                    {apt.pyeongPrice}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-[10px] font-medium text-purple-300 border border-purple-500/20 font-mono">
                    {apt.totalHouseholds}
                  </span>
                </div>

                {/* apt2.me Signature Price & Recovery Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2.5 my-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">최신 실거래가</span>
                    <div className="text-right">
                      <span className="text-xl font-mono font-black text-rose-400">
                        {apt.dealPrice}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1.5">
                        ({apt.changeDiff})
                      </span>
                    </div>
                  </div>

                  {/* Recovery Rate Bar (전고점 대비 회복률) */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <div className="flex justify-between items-center text-[11px] mb-1">
                      <span className="text-slate-400">전고점 {apt.athPrice.split(' ')[0]} 대비</span>
                      <span className="font-mono font-extrabold text-indigo-400">
                        회복률 {apt.recoveryRate}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          apt.recoveryRate >= 100
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                            : apt.recoveryRate >= 80
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                            : 'bg-slate-500'
                        }`}
                        style={{ width: `${Math.min(apt.recoveryRate, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Gap Investment Metrics */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px]">전세 </span>
                      <span className="font-mono font-bold text-slate-300">{apt.jeonsePrice}</span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1">({apt.jeonseRate}%)</span>
                    </div>
                    <div>
                      <span className="text-purple-400 font-semibold text-[11px]">갭 </span>
                      <span className="font-mono font-extrabold text-purple-300">{apt.gapPrice}</span>
                    </div>
                  </div>
                </div>

                {/* School District Quick Banner */}
                {apt.schoolInfo && (
                  <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between text-[11px] text-slate-300 mb-2">
                    <div className="flex items-center gap-1.5 truncate max-w-[210px]">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="truncate">{apt.schoolInfo.middleSchool.split('(')[0]}</span>
                    </div>
                    <span className="font-mono text-indigo-300 font-bold whitespace-nowrap">
                      학군점수 {apt.schoolInfo.schoolScore}점
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{apt.dealDate}</span>
                <span className="text-purple-400 group-hover:underline flex items-center gap-1 font-semibold">
                  apt2.me 정밀 분석 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* apt2.me Detail Modal Drawer */}
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
                  <span className="text-xs text-slate-400">
                    {selectedApt.builtYear}년 준공 &bull; {selectedApt.totalHouseholds} &bull; {selectedApt.exclusiveArea}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
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

            {/* Price & Recovery Card */}
            <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">최신 실거래가</div>
                <div className="text-2xl font-mono font-black text-rose-400 mt-1">
                  {selectedApt.dealPrice}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">{selectedApt.dealDate}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">전세가 & 전세가율</div>
                <div className="text-2xl font-mono font-black text-slate-200 mt-1">
                  {selectedApt.jeonsePrice}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-mono">전세가율 {selectedApt.jeonseRate}%</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <div className="text-xs text-indigo-300 font-medium flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-indigo-400" /> 갭투자 실투자금
                </div>
                <div className="text-2xl font-mono font-black text-indigo-300 mt-1">
                  {selectedApt.gapPrice}
                </div>
                <div className="text-[10px] text-indigo-400/80 mt-1">매매가 - 전세가 기준</div>
              </div>
            </div>

            {/* apt2.me Recovery & ATH Comparison */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 mb-5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-200">역대 전고점 시세 분석</span>
                <span className="font-mono text-indigo-400 font-bold">회복률 {selectedApt.recoveryRate}%</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>역대 최고가(ATH): <strong className="text-slate-200 font-mono">{selectedApt.athPrice}</strong></span>
                <span>현재 실거래가: <strong className="text-rose-400 font-mono">{selectedApt.dealPrice}</strong></span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                  style={{ width: `${Math.min(selectedApt.recoveryRate, 100)}%` }}
                />
              </div>
            </div>

            {/* apt2.me School Intelligence Box */}
            {selectedApt.schoolInfo && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-slate-900 to-purple-950/20 border border-indigo-500/30 space-y-2.5 mb-5">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span>apt2.me 학군 분석 리포트</span>
                  </div>
                  <span className="font-mono text-indigo-400 font-bold">학군 등급 점수 {selectedApt.schoolInfo.schoolScore}/100</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div>중학교 배정: <strong className="text-white">{selectedApt.schoolInfo.middleSchool}</strong></div>
                  <div>고교/대입 입결: <strong className="text-white">{selectedApt.schoolInfo.highSchool}</strong></div>
                  <div>학업성취도: <span className="font-mono text-emerald-400 font-bold">{selectedApt.schoolInfo.achievement}</span></div>
                </div>
              </div>
            )}

            {/* Direct Naver Link */}
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <a
                href={selectedApt.naverLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
              >
                <span>네이버 부동산 실시간 매물 확인하기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
