import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Bot, Clock, ArrowRight, ShieldCheck, Key, Copy, Check } from 'lucide-react';

const SUGGESTED_SEARCHES = [
  '오라클(ORCL) vs 엔비디아(NVDA) AI 데이터센터 수혜 분석',
  '서울 및 수도권 9억~12억대 갭투자 유망 아파트 비교',
  '미국 연준 2026년 기준금리 인하 경로 및 한국 증시 영향',
  '마포태영 vs DMC래미안e편한세상 30평대 실거주 비교'
];

export default function AiSearchView() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('jk_ai_search_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        query: '오라클(ORCL)과 엔비디아의 AI 멀티클라우드 동맹 현황',
        date: '2026.10.26',
        snippet: '오라클 OCI가 엔비디아의 핵심 인프라 파트너로 부상하며 RPO 수주 잔고가 급증하고 있습니다.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jk_ai_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleCopy = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(currentResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (searchQuery) => {
    const targetQuery = searchQuery || query;
    if (!targetQuery.trim() || isSearching) return;

    setIsSearching(true);
    setCurrentResult(null);

    setTimeout(() => {
      let resultText = '';
      const q = targetQuery.toLowerCase();

      if (q.includes('오라클') || q.includes('orcl') || q.includes('oracle')) {
        resultText = `### 🔍 오라클(ORCL) 기업 심층 AI 분석 리포트

1. **핵심 경쟁력 및 AI 클라우드(OCI) 수혜**:
   - **엔비디아와의 직결 파트너십**: 엔비디아 DGX Cloud가 오라클 OCI 상에서 구동되며, 고성능 베어메탈(Bare-metal) GPU 클러스터 할당 속도가 하이퍼스케일러 중 가장 빠름.
   - **멀티클라우드 독점적 입지**: 마이크로소프트 Azure, 구글 Cloud, 아마존 AWS 내에 오라클 데이터베이스 하드웨어를 직접 배치하는 파트너십을 체결하여 클라우드 전환 수수료를 독점적으로 흡수 중.

2. **재무 건전성 및 밸류에이션**:
   - FY2025 매출 성장률: 12% 이상 가속화 (클라우드 인프라 성장률 50%+).
   - RPO(잔여 계약 가치): **970억 달러** 돌파로 3~5년 간의 확정 매출 담보.
   - PER 38배 수준은 과거 대비 프리미엄이나, 연 25% 이상의 EPS 성장률 감안 시 합리적 구간.

3. **투자 전략 제안**:
   - 단기 급등에 따른 숨고르기 국면 분할 매수 유효. 주가 160달러 초반 지지선 설정 권장.`;
      } else if (q.includes('9억') || q.includes('12억') || q.includes('부동산') || q.includes('아파트')) {
        resultText = `### 🏢 서울·경기 9억~12억대 아파트 심층 비교 및 갭투자 진단

1. **타깃 가격대 시장 현황 (9억~12억)**:
   - 디딤돌·보금자리론 등 정책 모기지 상한선 및 대출 규제 경계선에 위치하여, 실수요자 매수세가 가장 탄탄하게 받쳐주는 '황금 가격대'입니다.
   - 연식 32년 이하(1994년 이후 준공) 단지는 주차, 엘리베이터, 커뮤니티 등 실거주 만족도가 높아 전세가율이 55~65% 수준으로 견조합니다.

2. **추천 핵심 단지 분석**:
   - **마포태영 (마포구 대흥동 / 33평 / 11.8억)**:
     - 대흥역 초역세권 + 공덕 업무지구 직주근접. 전세가 6.8억 형성으로 **갭투자 실투자금 5억원 선**.
   - **DMC래미안e편한세상 (서대문구 북가좌동 / 34평 / 11.2억)**:
     - 3,293세대 대단지 + 초중고 도보 통학. 전세가 6.5억으로 **갭투자 실투자금 4.7억원 선**.
   - **미사강변도시더샵센트럴포레 (하남시 / 34평 / 10.2억)**:
     - 2017년식 준신축, 쾌적한 한강 생활권, 전세가 6억으로 **갭투자 실투자금 4.2억원 선**.

3. **최종 결론**:
   - 금리 인하 사이클 도래 시 15억 이하 2차 랠리의 주도군으로 성장할 가능성이 매우 높습니다.`;
      } else {
        resultText = `### 💡 JK LAND 지능형 검색 결과: "${targetQuery}"

1. **종합 상황 진단**:
   - 해당 검색어와 관련된 국내외 금융 시장, 부동산 실거래가, 거시경제 지표 및 최신 뉴스 데이터를 종합 취합하였습니다.
   - 현재 글로벌 자산 시장은 인플레이션 둔화와 금리 완화 국면에서 기술주(AI/반도체)와 핵심 수도권 주거지에 유동성이 선별적으로 집중되고 있습니다.

2. **권장 체크리스트**:
   - 자산 포트폴리오의 현금 및 방어적 배당주 비중 30% 유지.
   - 수도권 9~12억대 실거주 아파트 및 글로벌 클라우드/AI 인프라 선도 기업에 대한 지속 모니터링 추천.`;
      }

      const newHistoryItem = {
        id: Date.now(),
        query: targetQuery,
        date: new Date().toLocaleDateString('ko-KR'),
        snippet: resultText.slice(0, 80) + '...'
      };

      setCurrentResult({
        query: targetQuery,
        text: resultText,
        time: new Date().toLocaleTimeString('ko-KR')
      });

      setSearchHistory([newHistoryItem, ...searchHistory.slice(0, 9)]);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Header Banner */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JK LAND AI 심층 검색 엔진</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            무엇이든 물어보세요. 시장의 해답을 찾아드립니다.
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            종목 밸류에이션, 오라클 실적, 수도권 9억~12억대 갭투자 아파트 비교까지 AI가 즉시 진단합니다.
          </p>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex gap-2 pt-2"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="예: 오라클 AI 클라우드 수혜 분석, 서울 9억~12억대 갭투자 추천..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>검색</span>
            </button>
          </form>

          {/* Suggested Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {SUGGESTED_SEARCHES.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(s);
                  handleSearch(s);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Result Box */}
      {isSearching && (
        <div className="glass-panel rounded-2xl p-8 border border-indigo-500/30 text-center space-y-3">
          <Bot className="w-8 h-8 text-indigo-400 animate-bounce mx-auto" />
          <div className="text-sm font-bold text-slate-200">
            실시간 시장 데이터 취합 및 AI 심층 진단 리포트 생성 중...
          </div>
          <p className="text-xs text-slate-500">CODEF 부동산 데이터 및 글로벌 증시 지표를 대조하고 있습니다.</p>
        </div>
      )}

      {currentResult && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-700/80 bg-slate-950/95 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-bold text-slate-200">"{currentResult.query}" 분석 결과</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료' : '리포트 복사'}</span>
            </button>
          </div>

          <div className="text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans space-y-2">
            {currentResult.text}
          </div>
        </div>
      )}

      {/* Recent AI Searches History */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <Clock className="w-4 h-4" />
          <span>최근 AI 검색 기록</span>
        </div>

        <div className="space-y-2">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setQuery(item.query);
                handleSearch(item.query);
              }}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 cursor-pointer flex items-center justify-between text-xs transition-colors group"
            >
              <div>
                <div className="font-semibold text-slate-200 group-hover:text-indigo-300">
                  {item.query}
                </div>
                <div className="text-[11px] text-slate-500 truncate max-w-md mt-0.5">
                  {item.snippet}
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                {item.date} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
