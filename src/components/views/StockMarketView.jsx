import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, TrendingDown, Search, RefreshCw, Activity, 
  BarChart2, ExternalLink, X, Sparkles, Building, Layers, ShieldCheck, 
  DollarSign, Star, FileText, Newspaper, Flame, Zap, CheckCircle2, ChevronRight, Target
} from 'lucide-react';
import { 
  STOCKEASY_MARKET_REGIME, 
  STOCKEASY_THEMES, 
  STOCKEASY_UNIVERSE, 
  searchStockEasy 
} from '../../data/stockeasyData';

export default function StockMarketView() {
  const [activeTab, setActiveTab] = useState('rsLeaders'); // 'rsLeaders' | 'athHigh' | 'aiResearch' | 'all' | 'my'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalTab, setModalTab] = useState('deepResearch'); // 'deepResearch' | 'proChart' | 'financials' | 'news'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // My Favorites (Watchlist) with versioned key
  const [myStocks, setMyStocks] = useState(() => {
    const saved = localStorage.getItem('jk_stockeasy_favs_v2');
    return saved ? JSON.parse(saved) : ['ORCL', 'NVDA', '005930', '000660', 'PLTR'];
  });

  const searchContainerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('jk_stockeasy_favs_v2', JSON.stringify(myStocks));
  }, [myStocks]);

  // Click outside search container to close autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFavorite = (e, code) => {
    e.stopPropagation();
    if (myStocks.includes(code)) {
      setMyStocks(myStocks.filter((c) => c !== code));
    } else {
      setMyStocks([...myStocks, code]);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Search logic using universal StockEasy engine
  const searchResults = searchStockEasy(searchTerm, STOCKEASY_UNIVERSE);

  // Filter based on active StockEasy tab
  const filteredStocks = searchResults.filter((stock) => {
    if (activeTab === 'my') return myStocks.includes(stock.code);
    if (activeTab === 'rsLeaders') return stock.rsScore >= 90; // 종합 RS 90+ 시장 주도주
    if (activeTab === 'athHigh') return stock.athNearPct >= -5.0; // 52주 신고가 근접 종목
    if (activeTab === 'aiResearch') return stock.aiDeepResearch !== undefined;
    return true; // 'all'
  });

  const renderMiniChart = (points, isUp) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 84;
    const height = 26;

    const coords = points
      .map((val, idx) => {
        const x = (idx / (points.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#f43f5e' : '#38bdf8';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      {/* StockEasy Brand Header */}
      <div className="glass-panel rounded-3xl p-5 md:p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Zap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-heading">
                  StockEasy <span className="text-indigo-400 font-medium text-sm">스탁이지 Intellio</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold">
                  AI Deep Research
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                종합 RS(상대강도) &bull; MTT 트렌드 템플릿 &bull; 52주 신고가 &bull; 실시간 전 종목 검색 엔진
              </p>
            </div>
          </div>

          {/* Live Autocomplete Search Box */}
          <div ref={searchContainerRef} className="relative flex-1 md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="어떤 종목이든 검색 (오라클, 엔비디아, 삼전, AVGO)..."
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearchFocused(true);
                }}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Floating Autocomplete Dropdown */}
            {isSearchFocused && searchTerm.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl z-50 max-h-72 overflow-y-auto divide-y divide-slate-800">
                <div className="px-3.5 py-2 text-[11px] font-semibold text-slate-400 flex items-center justify-between bg-slate-950/60">
                  <span>실시간 검색 결과</span>
                  <span className="font-mono text-indigo-400">{searchResults.length}건 매칭</span>
                </div>
                {searchResults.slice(0, 7).map((item) => (
                  <div
                    key={item.code}
                    onClick={() => {
                      setSelectedStock(item);
                      setIsSearchFocused(false);
                    }}
                    className="p-3 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-300">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">({item.code})</span>
                        <span className="text-[9px] font-mono px-1.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.market}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px] mt-0.5">
                        {item.sector}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-white">
                        {item.market === 'NASDAQ' || item.market === 'NYSE' ? `$${item.price.toFixed(2)}` : `${item.price.toLocaleString()}원`}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <span className={`text-[10px] font-mono font-bold ${item.change >= 0 ? 'text-rose-400' : 'text-blue-400'}`}>
                          {item.change >= 0 ? '+' : ''}{item.changePercent}%
                        </span>
                        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                          RS {item.rsScore}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* StockEasy Market Regime (시장 신호등 🚦) */}
        <div className="pt-4 mt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <span>시장 레짐 (Market Status)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-slate-500 font-mono text-[11px]">실시간 시장 신호등</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {STOCKEASY_MARKET_REGIME.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="text-[11px] font-bold text-slate-300">{item.name}</div>
                  <div className="font-mono font-extrabold text-white text-xs mt-0.5">{item.value}</div>
                </div>
                <div className="text-right font-mono text-[11px]">
                  <div className={item.change.startsWith('+') ? 'text-rose-400 font-bold' : 'text-blue-400 font-bold'}>
                    {item.percent}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* StockEasy 5 Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-4 border-t border-slate-800/80 text-xs">
          {[
            { id: 'rsLeaders', label: '🚀 종합 RS 주도주 (RS 90+)', desc: '시장 주도주 스크리너' },
            { id: 'athHigh', label: '📈 52주 신고가 근접', desc: '돌파 임박 종목' },
            { id: 'aiResearch', label: '🤖 AI 딥 리서치 랭킹', desc: '애널리스트 분석' },
            { id: 'all', label: '📊 전체 종목 보기', desc: '전체 모니터링' },
            { id: 'my', label: `⭐ MY 포트폴리오 (${myStocks.length})`, desc: '관심 종목' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Leading Themes Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center gap-3 overflow-x-auto no-scrollbar text-xs">
        <span className="font-bold text-slate-300 whitespace-nowrap flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-rose-500" /> 오늘 주도 테마:
        </span>
        {STOCKEASY_THEMES.map((theme) => (
          <div
            key={theme.id}
            onClick={() => setSearchTerm(theme.leaders[0].split('(')[0])}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 cursor-pointer whitespace-nowrap transition-all"
          >
            <span className="font-semibold text-slate-200">{theme.name}</span>
            <span className="font-mono font-bold text-rose-400">+{theme.changePercent}%</span>
            <span className="text-[10px] text-slate-500 font-mono">({theme.leaders[0]})</span>
          </div>
        ))}
      </div>

      {/* Stock Cards Grid (StockEasy Design) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStocks.map((stock) => {
          const isUp = stock.change >= 0;
          const isUs = stock.market === 'NASDAQ' || stock.market === 'NYSE';
          const isFav = myStocks.includes(stock.code);

          return (
            <div
              key={stock.code}
              onClick={() => {
                setSelectedStock(stock);
                setModalTab('deepResearch');
              }}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer relative flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Code */}
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                        {stock.market}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        {stock.code}
                      </span>
                      {stock.mttPassed && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          MTT 통과 🟢
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mt-1">
                      {stock.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate max-w-[170px] mt-0.5">
                      {stock.sector}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      onClick={(e) => toggleFavorite(e, stock.code)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isFav
                          ? 'text-amber-400 hover:text-amber-300 bg-amber-500/10'
                          : 'text-slate-600 hover:text-slate-300 bg-slate-800/50'
                      }`}
                      title={isFav ? 'MY 종목 해제' : 'MY 종목 추가'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                    {renderMiniChart(stock.chartPoints, isUp)}
                  </div>
                </div>

                {/* Price & RS Score Row */}
                <div className="flex items-baseline justify-between mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-500">현재가</div>
                    <div className="text-xl font-mono font-black text-white">
                      {isUs ? `$${stock.price.toFixed(2)}` : `${stock.price.toLocaleString()}원`}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`flex items-center gap-1 font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isUp
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isUp ? '+' : ''}{stock.changePercent}%</span>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      신고가 대비 <strong className="text-indigo-400">{stock.athNearPct}%</strong>
                    </div>
                  </div>
                </div>

                {/* StockEasy Exclusive RS Score Bar */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-300">종합 상대강도(RS):</span>
                    <span className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-extrabold text-[11px] shadow-sm shadow-indigo-600/30">
                      RS {stock.rsScore}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {stock.analystConsensus.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>시총 {stock.marketCap}</span>
                <span className="text-indigo-400 group-hover:underline flex items-center gap-1 font-semibold">
                  스탁이지 리서치 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* StockEasy Pro Modal (Deep Research & Chart & Financials) */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-slate-700 bg-slate-950/95 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {selectedStock.market} &bull; {selectedStock.code}
                  </span>
                  <span className="text-xs text-slate-400">{selectedStock.sector}</span>
                  {selectedStock.mttPassed && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      MTT 트렌드 충족 🟢
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                  <span>{selectedStock.name}</span>
                  {selectedStock.enName && <span className="text-sm font-normal text-slate-400">({selectedStock.enName})</span>}
                  <button
                    onClick={(e) => toggleFavorite(e, selectedStock.code)}
                    className="p-1 text-amber-400"
                    title="즐겨찾기 토글"
                  >
                    <Star className={`w-5 h-5 ${myStocks.includes(selectedStock.code) ? 'fill-amber-400' : ''}`} />
                  </button>
                </h2>
              </div>

              <button
                onClick={() => setSelectedStock(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="my-5 flex items-baseline justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div>
                <div className="text-xs text-slate-400 font-medium">현재가</div>
                <div className="text-3xl font-mono font-black text-white mt-0.5">
                  {selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE'
                    ? `$${selectedStock.price.toFixed(2)}`
                    : `${selectedStock.price.toLocaleString()}원`}
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`flex items-center gap-1.5 font-mono text-sm font-bold px-3 py-1.5 rounded-xl ${
                    selectedStock.change >= 0
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>
                    {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toLocaleString()} ({selectedStock.changePercent}%)
                  </span>
                </div>
                <div className="text-xs font-mono text-indigo-400 font-bold mt-1.5">
                  목표주가 컨센서스 {selectedStock.targetPrice}
                </div>
              </div>
            </div>

            {/* StockEasy 4 Modal Tabs */}
            <div className="flex border-b border-slate-800 mb-5 text-xs font-bold">
              <button
                onClick={() => setModalTab('deepResearch')}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all ${
                  modalTab === 'deepResearch'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI 딥 리서치</span>
              </button>

              <button
                onClick={() => setModalTab('proChart')}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all ${
                  modalTab === 'proChart'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>프로 차트 & 이평선</span>
              </button>

              <button
                onClick={() => setModalTab('financials')}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all ${
                  modalTab === 'financials'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>재무제표 (실적 분석)</span>
              </button>

              <button
                onClick={() => setModalTab('news')}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all ${
                  modalTab === 'news'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>관련 속보 뉴스</span>
              </button>
            </div>

            {/* Modal Tab 1: AI Deep Research */}
            {modalTab === 'deepResearch' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                {/* RS & Consensus Highlights */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
                  <div>
                    <div className="text-slate-400">종합 상대강도 (RS)</div>
                    <div className="text-lg font-mono font-black text-indigo-400 mt-0.5">
                      RS {selectedStock.rsScore} / 99
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">52주 신고가 근접률</div>
                    <div className="text-lg font-mono font-black text-white mt-0.5">
                      {selectedStock.athNearPct}%
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">투자의견</div>
                    <div className="text-lg font-mono font-black text-emerald-400 mt-0.5">
                      {selectedStock.analystConsensus.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* AI Briefing */}
                {selectedStock.aiDeepResearch && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <div className="font-bold text-slate-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                        <span>핵심 투자 포인트 & 모멘텀</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedStock.aiDeepResearch.summary}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <div className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span>상승 촉매 (Catalyst)</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedStock.aiDeepResearch.catalyst}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-rose-950/15 border border-rose-500/20 space-y-1">
                      <div className="font-bold text-rose-300">⚠️ 리스크 점검</div>
                      <p className="text-slate-300 leading-relaxed">
                        {selectedStock.aiDeepResearch.risk}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modal Tab 2: Pro Chart & Moving Averages */}
            {modalTab === 'proChart' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">주요 이동평균선 배열 상태</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {selectedStock.mttPassed ? '정배열(20>50>200) 상승세' : '이평선 혼조 구간'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-[11px] text-slate-400">20일 이평선</div>
                      <div className="text-sm font-mono font-bold text-rose-400 mt-0.5">
                        {selectedStock.mas?.ma20?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-[11px] text-slate-400">50일 이평선</div>
                      <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">
                        {selectedStock.mas?.ma50?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <div className="text-[11px] text-slate-400">200일 이평선</div>
                      <div className="text-sm font-mono font-bold text-indigo-400 mt-0.5">
                        {selectedStock.mas?.ma200?.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    * 스탁이지 프로차트는 윌리엄 오닐의 CAN SLIM 및 마크 미너비니의 주도주 추세추종 알고리즘을 기준으로 산출됩니다.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Tab 3: Financials */}
            {modalTab === 'financials' && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
                      <tr>
                        <th className="p-3">결산연도</th>
                        <th className="p-3">매출액</th>
                        <th className="p-3">영업이익</th>
                        <th className="p-3">영업이익률(OPM)</th>
                        <th className="p-3">당기순이익</th>
                        <th className="p-3">ROE</th>
                        <th className="p-3">부채비율</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                      {(selectedStock.financials || []).map((fin, i) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-indigo-300">{fin.year}</td>
                          <td className="p-3">{fin.revenue}</td>
                          <td className="p-3 font-semibold text-rose-400">{fin.opProfit}</td>
                          <td className="p-3 text-amber-400">{fin.opm}</td>
                          <td className="p-3">{fin.netProfit}</td>
                          <td className="p-3 text-emerald-400">{fin.roe}</td>
                          <td className="p-3 text-slate-400">{fin.debtRatio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modal Tab 4: News Feed */}
            {modalTab === 'news' && (
              <div className="space-y-3 animate-fadeIn text-xs">
                {(selectedStock.news || []).map((n, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-slate-200 hover:text-indigo-300 transition-colors">
                        {n.title}
                      </h4>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        {n.press} &bull; {n.time}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                      스탁이지 속보
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* External Links */}
            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800 text-xs">
              <a
                href={
                  selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE'
                    ? `https://finance.yahoo.com/quote/${selectedStock.code}`
                    : `https://finance.naver.com/item/main.naver?code=${selectedStock.code}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
              >
                <span>{selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE' ? 'Yahoo Finance 원문' : '네이버 증권 상세'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
