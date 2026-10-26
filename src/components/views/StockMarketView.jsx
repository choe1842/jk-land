import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Plus, RefreshCw, DollarSign, Activity } from 'lucide-react';
import { INITIAL_DOMESTIC_STOCKS, INITIAL_US_STOCKS } from '../../data/mockData';

export default function StockMarketView() {
  const [marketTab, setMarketTab] = useState('kr'); // 'kr' | 'us'
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [krStocks, setKrStocks] = useState(() => {
    const saved = localStorage.getItem('jk_stocks_kr');
    return saved ? JSON.parse(saved) : INITIAL_DOMESTIC_STOCKS;
  });

  const [usStocks, setUsStocks] = useState(() => {
    const saved = localStorage.getItem('jk_stocks_us');
    return saved ? JSON.parse(saved) : INITIAL_US_STOCKS;
  });

  // New stock form
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const currentStocks = marketTab === 'kr' ? krStocks : usStocks;

  const filteredStocks = currentStocks.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    const priceNum = parseFloat(newPrice) || (marketTab === 'kr' ? 50000 : 100);
    const newStock = {
      id: newCode.trim(),
      name: newName.trim(),
      code: newCode.trim().toUpperCase(),
      market: marketTab === 'kr' ? 'KOSPI' : 'NASDAQ',
      price: priceNum,
      change: +(priceNum * 0.015).toFixed(2),
      changePercent: 1.5,
      volume: '1.2M',
      sparkline: [priceNum * 0.98, priceNum * 0.99, priceNum * 1.01, priceNum]
    };

    if (marketTab === 'kr') {
      const updated = [...krStocks, newStock];
      setKrStocks(updated);
      localStorage.setItem('jk_stocks_kr', JSON.stringify(updated));
    } else {
      const updated = [...usStocks, newStock];
      setUsStocks(updated);
      localStorage.setItem('jk_stocks_us', JSON.stringify(updated));
    }

    setNewName('');
    setNewCode('');
    setNewPrice('');
    setIsAdding(false);
  };

  // Helper to render mini SVG sparklines
  const renderSparkline = (data, isUp) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
      })
      .join(' ');

    const strokeColor = isUp ? '#f43f5e' : '#38bdf8';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls */}
      <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Domestic / US Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setMarketTab('kr')}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                marketTab === 'kr'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇰🇷 국내 주식 (KOSPI/KOSDAQ)
            </button>
            <button
              onClick={() => setMarketTab('us')}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                marketTab === 'us'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 미국 주식 (S&P500/NASDAQ)
            </button>
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
        </div>

        {/* Search and Add */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="종목명 또는 심볼 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold whitespace-nowrap transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>관심종목 추가</span>
          </button>
        </div>
      </div>

      {/* Add Stock Form */}
      {isAdding && (
        <form onSubmit={handleAddStock} className="glass-panel rounded-2xl p-4 border border-indigo-500/40 bg-slate-900/95 space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>새로운 관심 종목 등록 ({marketTab === 'kr' ? '국내' : '미국'})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="종목명 (예: 카카오, MSFT)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="종목코드 (예: 035720, AAPL)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="number"
              placeholder={marketTab === 'kr' ? '현재가 (원)' : '현재가 ($)'}
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
              추가 완료
            </button>
          </div>
        </form>
      )}

      {/* Stock Cards Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStocks.map((stock) => {
          const isUp = stock.change >= 0;
          return (
            <div
              key={stock.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/80 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {stock.market} &bull; {stock.code}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1">
                      {stock.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    {renderSparkline(stock.sparkline, isUp)}
                  </div>
                </div>

                <div className="flex items-baseline justify-between mt-4">
                  <div className="text-2xl font-mono font-extrabold text-slate-100">
                    {marketTab === 'kr'
                      ? `${stock.price.toLocaleString()}원`
                      : `$${stock.price.toFixed(2)}`}
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

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>거래량 <strong className="text-slate-300 font-mono">{stock.volume}</strong></span>
                <span className="font-mono text-slate-500">
                  변동: {isUp ? '+' : ''}{stock.change.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
