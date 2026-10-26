import React, { useState } from 'react';
import { 
  Building2, Search, Filter, TrendingUp, TrendingDown, MapPin, 
  Calculator, Calendar, ExternalLink, X, School, Train, Sparkles, Plus, ArrowUpDown
} from 'lucide-react';
import { REGIONS, ALL_APARTMENTS } from '../../data/realEstateData';

export default function RealEstateView() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('전체');
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under10', '10to20', '20to30', 'over30'
  const [sizeFilter, setSizeFilter] = useState('all'); // 'all', '20평대', '30평대', '40평대 이상'
  const [sortBy, setSortBy] = useState('priceDesc'); // 'priceDesc', 'gapAsc', 'date'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);

  const [apartments, setApartments] = useState(() => {
    const saved = localStorage.getItem('jk_all_apartments');
    return saved ? JSON.parse(saved) : ALL_APARTMENTS;
  });

  // Adding custom apartment
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRegion, setNewRegion] = useState('서울 강남구');
  const [newPrice, setNewPrice] = useState('');
  const [newJeonse, setNewJeonse] = useState('');

  // Handle city selection change
  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setSelectedDistrict('전체');
  };

  const currentDistricts = REGIONS.find((r) => r.id === selectedCity)?.districts || [];

  // Filter apartments
  const filteredApartments = apartments.filter((apt) => {
    // Search
    const matchSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.dong.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchSearch) return false;

    // City & District
    if (selectedCity !== 'all' && apt.city !== selectedCity) return false;
    if (selectedDistrict !== '전체' && !apt.district.includes(selectedDistrict)) return false;

    // Price range
    const price = apt.recentPriceNum; // in 10,000 KRW (e.g. 228000 = 22.8억)
    if (priceRange === 'under10' && price > 100000) return false;
    if (priceRange === '10to20' && (price < 100000 || price > 200000)) return false;
    if (priceRange === '20to30' && (price < 200000 || price > 300000)) return false;
    if (priceRange === 'over30' && price < 300000) return false;

    // Size category
    if (sizeFilter !== 'all' && apt.sizeCategory !== sizeFilter) return false;

    return true;
  });

  // Sort apartments
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortBy === 'priceDesc') return b.recentPriceNum - a.recentPriceNum;
    if (sortBy === 'gapAsc') return a.jeonseRate - b.jeonseRate;
    return 0;
  });

  const handleAddApartment = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice.trim()) return;

    const newApt = {
      id: `apt-${Date.now()}`,
      name: newName.trim(),
      city: 'seoul',
      district: newRegion,
      dong: '지역',
      sizeCategory: '30평대',
      exclusiveArea: '84㎡ (34평)',
      recentPriceNum: 200000,
      recentPrice: newPrice.trim(),
      previousPrice: '직전가 없음',
      changeDiff: '신규등록',
      isUp: true,
      jeonsePrice: newJeonse.trim() || '정보 없음',
      gapPrice: '직접 계산',
      jeonseRate: 50,
      pyeongPrice: '평당가 계산',
      dealDate: '2026.10',
      totalHouseholds: '단지정보',
      builtYear: 2020,
      naverListings: { sale: 15, rent: 8 },
      station: '역세권 정보',
      school: '학군 정보',
      naverLink: `https://m.land.naver.com/search/result/${encodeURIComponent(newName.trim())}`
    };

    const updated = [newApt, ...apartments];
    setApartments(updated);
    localStorage.setItem('jk_all_apartments', JSON.stringify(updated));
    setNewName('');
    setNewPrice('');
    setNewJeonse('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Filter and Search Control Center */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>네이버 부동산 기반 아파트 실거래 & 갭투자 분석</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {sortedApartments.length}개 단지
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                수도권 및 주요 광역시 대장 아파트 실거래가, 매물 호가, 갭투자 자금 및 전세가율 다차원 필터링
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="단지명, 법정동, 구 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 w-48 md:w-60"
              />
            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold whitespace-nowrap transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>단지 등록</span>
            </button>
          </div>
        </div>

        {/* Multi-tier Filter System */}
        <div className="pt-3 border-t border-slate-800/60 space-y-3">
          {/* 1. City / Province Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold whitespace-nowrap">시/도:</span>
            {REGIONS.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCityChange(city.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCity === city.id
                    ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* 2. District Filter (if not 'all') */}
          {selectedCity !== 'all' && currentDistricts.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs animate-fadeIn">
              <span className="text-slate-400 font-semibold whitespace-nowrap">구/군:</span>
              {currentDistricts.map((dist) => (
                <button
                  key={dist}
                  onClick={() => setSelectedDistrict(dist)}
                  className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-all ${
                    selectedDistrict === dist
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          )}

          {/* 3. Price & Size & Sort Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/40 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-medium">금액대:</span>
              {[
                { id: 'all', label: '전체' },
                { id: 'under10', label: '10억 이하' },
                { id: '10to20', label: '10억~20억' },
                { id: '20to30', label: '20억~30억' },
                { id: 'over30', label: '30억 이상' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceRange(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    priceRange === p.id
                      ? 'bg-slate-700 text-white border border-slate-600 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">정렬:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 focus:outline-none focus:border-purple-500"
              >
                <option value="priceDesc">실거래가 높은순</option>
                <option value="gapAsc">전세가율 높은순 (갭투자순)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Add Apartment Form */}
      {isAdding && (
        <form onSubmit={handleAddApartment} className="glass-panel rounded-2xl p-4 border border-purple-500/40 bg-slate-900/95 space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span>새로운 아파트 단지 등록</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="단지명 (예: 반포자이)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="지역 (예: 서울 서초구 반포동)"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="최근 매매 실거래가 (예: 35억)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="text"
              placeholder="최근 전세가 (예: 17억)"
              value={newJeonse}
              onChange={(e) => setNewJeonse(e.target.value)}
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

      {/* Apartment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedApartments.map((apt) => (
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

            {/* Footer Naver Real Estate Link & Metadata */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-slate-500 truncate max-w-[170px]">
                {apt.dealDate}
              </span>
              <span className="text-purple-400 group-hover:underline flex items-center gap-1">
                상세 분석 &rarr;
              </span>
            </div>
          </div>
        ))}
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
                  <span className="text-xs text-slate-400">{selectedApt.builtYear}년 준공 &bull; {selectedApt.totalHouseholds}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-100 mt-1">
                  {selectedApt.name}
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

            {/* Infrastructure & Naver Listings */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-200">단지 인프라 & 네이버 등록 매물 현황</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Train className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{selectedApt.station}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <School className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>{selectedApt.school}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>네이버 부동산 현재 매물</span>
                <span className="font-mono text-slate-200">
                  매매 <strong className="text-indigo-400">{selectedApt.naverListings?.sale || 50}</strong>건 &bull; 전세 <strong className="text-emerald-400">{selectedApt.naverListings?.rent || 20}</strong>건
                </span>
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
