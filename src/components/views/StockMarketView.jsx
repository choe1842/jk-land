import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Search, Plus, RefreshCw, Activity, 
  BarChart2, ExternalLink, X, Sparkles, Building, Layers, ShieldCheck, 
  DollarSign, Star, FileText, Newspaper
} from 'lucide-react';
import { ALL_STOCKS } from '../../data/stockData';

export default function StockMarketView() {
  const [marketFilter, setMarketFilter] = useState('ALL'); // 'ALL' | 'MY' | 'KOSPI' | 'KOSDAQ' | 'US'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalTab, setModalTab] = useState('overview'); // 'overview' | 'financials' | 'news'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // My Favorites (Watchlist)
  const [myStocks, setMyStocks] = useState(() => {
    const saved = localStorage.getItem('jk_my_stocks');
    return saved ? JSON.parse(saved) : ['005930', 'NVDA', '000660', 'AAPL'];
  });

  const [stocks, setStocks] = useState(() => {
    const saved = localStorage.getItem('jk_all_stocks');
    return saved ? JSON.parse(saved) : ALL_STOCKS;
  });

  // Adding custom stock
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newMarket, setNewMarket] = useState('KOSPI');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('jk_my_stocks', JSON.stringify(myStocks));
  }, [myStocks]);

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

  const filteredStocks = stocks.filter((stock) => {
    const matchSearch =
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stock.enName && stock.enName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (stock.sector && stock.sector.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchSearch) return false;

    if (marketFilter === 'ALL') return true;
    if (marketFilter === 'MY') return myStocks.includes(stock.code);
    if (marketFilter === 'KOSPI') return stock.market === 'KOSPI';
    if (marketFilter === 'KOSDAQ') return stock.market === 'KOSDAQ';
    if (marketFilter === 'US') return stock.market === 'NASDAQ' || stock.market === 'NYSE';
    return true;
  });

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const priceNum = parseFloat(newPrice) || 50000;
    const isUs = newMarket === 'NASDAQ' || newMarket === 'NYSE';

    const newStock = {
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      enName: newName.trim(),
      market: newMarket,
      price: priceNum,
      change: +(priceNum * 0.015).toFixed(2),
      changePercent: 1.5,
      volume: '1.2M',
      marketCap: isUs ? '$10B' : '1조 2,000억',
      per: 15.0,
      pbr: 1.2,
      dividendYield: '1.5%',
      high52: priceNum * 1.3,
      low52: priceNum * 0.8,
      foreignRate: isUs ? 'Global' : '30%',
      sector: '사용자 등록 종목',
      aiInsight: `${newName} 종목이 등록되었습니다. 실시간 시세 및 재무 지표를 추적합니다.`,
      chart: [priceNum * 0.95, priceNum * 0.98, priceNum * 0.97, priceNum * 1.01, priceNum],
      financials: [
        { year: '2023', revenue: '정보 수집 중', opProfit: '-', netProfit: '-', roe: '-', debtRatio: '-' },
        { year: '2024(E)', revenue: '정보 수집 중', opProfit: '-', netProfit: '-', roe: '-', debtRatio: '-' }
      ],
      news: [
        { title: `${newName} 신규 관심 종목 편입 및 모니터링 개시`, time: '방금 전', press: 'JK LAND' }
      ]
    };

    const updated = [newStock, ...stocks];
    setStocks(updated);
    localStorage.setItem('jk_all_stocks', JSON.stringify(updated));
    setNewName('');
    setNewCode('');
    setNewPrice('');
    setIsAdding(false);
  };

  const renderSparkline = (data, isUp) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 84;
    const height = 26;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
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
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Top Action Bar */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800/80 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>글로벌 주식 관제 & 종목 분석</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {filteredStocks.length}개 종목 조회
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                한국 코스피/코스닥 및 미국 빅테크 실시간 시세, 재무제표, 기업 뉴스 및 AI 진단 리포트
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="종목명, 티커, 영문명 검색 (예: 삼전, NVDA, 바이오)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all ${
                isRefreshing ? 'animate-spin text-indigo-400' : ''
              }`}
              title="시세 새로고침"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold whitespace-nowrap transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>종목 추가</span>
            </button>
          </div>
        </div>

        {/* Market Filter Tabs with MY 종목 Favorite */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800/60 text-xs">
          {[
            { id: 'ALL', label: '전체 종목' },
            { id: 'MY', label: `⭐ MY 종목 (${myStocks.length})`, highlight: true },
            { id: 'KOSPI', label: '🇰🇷 코스피 (KOSPI)' },
            { id: 'KOSDAQ', label: '🇰🇷 코스닥 (KOSDAQ)' },
            { id: 'US', label: '🇺🇸 미국 증시 (NASDAQ/NYSE)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMarketFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                marketFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : tab.highlight
                  ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                  : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Stock Modal Form */}
      {isAdding && (
        <form onSubmit={handleAddStock} className="glass-panel rounded-2xl p-4 border border-indigo-500/40 bg-slate-900/95 space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>새로운 관심 종목 직접 추가</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="종목명 (예: 두산에너빌리티, MSFT)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="종목코드 (예: 034020, MSFT)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <select
              value={newMarket}
              onChange={(e) => setNewMarket(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="KOSPI">KOSPI</option>
              <option value="KOSDAQ">KOSDAQ</option>
              <option value="NASDAQ">NASDAQ</option>
              <option value="NYSE">NYSE</option>
            </select>
            <input
              type="number"
              placeholder="현재 가격 (원 또는 $)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
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
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
            >
              등록 완료
            </button>
          </div>
        </form>
      )}

      {/* Stock Cards Grid (Bento Layout) */}
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
                setModalTab('overview');
              }}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 cursor-pointer relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/80">
                        {stock.market}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        {stock.code}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mt-1.5">
                      {stock.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate max-w-[170px]">
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
                      title={isFav ? 'MY 종목에서 해제' : 'MY 종목에 추가'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                    {renderSparkline(stock.chart, isUp)}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-4">
                  <div className="text-2xl font-mono font-extrabold text-slate-100">
                    {isUs ? `$${stock.price.toFixed(2)}` : `${stock.price.toLocaleString()}원`}
                  </div>

                  <div
                    className={`flex items-center gap-1 font-mono text-xs font-bold px-2 py-1 rounded-lg ${
                      isUp
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{isUp ? '+' : ''}{stock.changePercent}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>시총 {stock.marketCap}</span>
                <span className="text-indigo-400 group-hover:underline flex items-center gap-1 font-semibold">
                  재무 & 뉴스 분석 &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stock Deep-Dive Analysis Modal with Financials & News Tabs */}
      {selectedStock && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 md:p-8 border border-slate-700 bg-slate-950/95 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {selectedStock.market} &bull; {selectedStock.code}
                  </span>
                  <span className="text-xs text-slate-400">{selectedStock.sector}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-100 mt-1 flex items-center gap-2">
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

            {/* Current Price and Day Change */}
            <div className="my-5 flex items-baseline justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div>
                <div className="text-xs text-slate-400 font-medium">현재가</div>
                <div className="text-3xl font-mono font-black text-white mt-0.5">
                  {selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE'
                    ? `$${selectedStock.price.toFixed(2)}`
                    : `${selectedStock.price.toLocaleString()}원`}
                </div>
              </div>

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
            </div>

            {/* 3 Navigation Tabs inside Modal */}
            <div className="flex border-b border-slate-800 mb-5 text-xs font-bold">
              <button
                onClick={() => setModalTab('overview')}
                className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all ${
                  modalTab === 'overview'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>종합 시세 & AI 진단</span>
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
                <span>재무제표 (연간 실적)</span>
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
                <span>관련 기사 / 공시</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {modalTab === 'overview' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[11px] text-slate-400">시가총액</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-1">{selectedStock.marketCap}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[11px] text-slate-400">PER / PBR</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-1">{selectedStock.per}배 / {selectedStock.pbr}배</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[11px] text-slate-400">배당수익률</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-1">{selectedStock.dividendYield}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="text-[11px] text-slate-400">52주 최고/최저</div>
                    <div className="text-xs font-mono font-bold text-slate-200 mt-1">
                      {selectedStock.high52.toLocaleString()} / {selectedStock.low52.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* AI Investment Analysis Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>JK AI 지능형 종목 진단 리포트</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedStock.aiInsight}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Financials Table */}
            {modalTab === 'financials' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                  <span>최근 3개년 주요 포괄손익 및 재무 지표</span>
                  <span className="text-[10px] text-indigo-400 font-mono">단위: 연결 기준</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px]">
                      <tr>
                        <th className="p-3">결산연도</th>
                        <th className="p-3">매출액</th>
                        <th className="p-3">영업이익</th>
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

            {/* Tab 3: News Feed */}
            {modalTab === 'news' && (
              <div className="space-y-3 animate-fadeIn">
                {(selectedStock.news || []).map((n, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 hover:text-indigo-300 transition-colors">
                        {n.title}
                      </h4>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        {n.press} &bull; {n.time}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 whitespace-nowrap">
                      속보
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* External Links */}
            <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-800">
              <a
                href={
                  selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE'
                    ? `https://finance.yahoo.com/quote/${selectedStock.code}`
                    : `https://finance.naver.com/item/main.naver?code=${selectedStock.code}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                <span>{selectedStock.market === 'NASDAQ' || selectedStock.market === 'NYSE' ? 'Yahoo Finance 바로가기' : '네이버 증권 상세정보'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
