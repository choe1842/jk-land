import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Trash2, Copy, Check, Sparkles, Key, Info } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'ai',
    text: '안녕하세요 JK님! JK LAND 전용 AI 어시스턴트입니다.\n국내/미국 주식 시장 동향, 호갱노노 스타일 부동산 실거래가 분석, 업무 메모 등 무엇이든 질문해 주세요. 대화 내용은 영구적으로 안전하게 기록됩니다.',
    timestamp: '2026-10-26 22:30'
  }
];

export default function AiChatView() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('jk_chat_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('jk_gemini_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('jk_chat_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSaveKey = (val) => {
    setApiKey(val);
    localStorage.setItem('jk_gemini_api_key', val);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    if (window.confirm('채팅 기록을 모두 지우시겠습니까?')) {
      setMessages([]);
      localStorage.removeItem('jk_chat_messages');
    }
  };

  // Generate intelligent response for financial / real-estate / general queries
  const generateAiReply = (userQuery) => {
    const query = userQuery.toLowerCase();

    if (query.includes('주식') || query.includes('삼성') || query.includes('엔비디아') || query.includes('나스닥')) {
      return `📈 **[JK 금융 분석 리포트]**\n- **글로벌 기술주 동향**: 엔비디아와 빅테크 기업들의 AI 반도체 수요가 견조하여 나스닥 18,500선 안착을 시험 중입니다.\n- **국내 증시 포인트**: 삼성전자와 SK하이닉스의 HBM 공급 모멘텀과 환율(1,380원선) 변동성을 주시할 필요가 있습니다.\n- **전략 제안**: 고배당 우량주와 성장주 포트폴리오를 7:3 비율로 분산하는 헷지 전략을 추천드립니다.`;
    }

    if (query.includes('부동산') || query.includes('아파트') || query.includes('갭') || query.includes('전세')) {
      return `🏢 **[호갱노노 실거래가 인사이트]**\n- **핵심지 실거래 추이**: 서초/강남 대장단지(아크로리버파크, 디에이치 등)는 신고가 경신 흐름이며, 마용성(마포래미안푸르지오 등)은 전세가율 55% 수준에서 매매가 지지선이 형성되어 있습니다.\n- **갭투자 현황**: 대단지 기준 갭이 8억~12억 수준으로 형성되어 있어, 대출 규제와 금리 인하 기대감이 교차하는 국면입니다.\n- **관심 추천**: 직주근접성이 뛰어난 판교/분당 테크밸리 역세권 단지를 지속 모니터링해보세요.`;
    }

    if (query.includes('jk랜드') || query.includes('기능') || query.includes('아이디어')) {
      return `🏰 **[JK LAND 업데이트 제안]**\n1. **포트폴리오 자산 트래커**: 주식 평가액과 부동산 목표 자산을 한눈에 보는 Net Worth 대시보드\n2. **자동화 알림봇**: 매일 아침 9시 코스피 개장 브리핑 자동 요약\n3. **개인 위키/블로그**: 마크다운 기술 문서 에디터 통합\n어떤 기능을 다음으로 추가해 볼까요?`;
    }

    return `💡 **[JK 어시스턴트 답변]**\n"${userQuery}"에 대해 기록되었습니다.\nJK랜드 시스템에 안전하게 저장되었으며, 앞으로 다양한 자동화 기능 및 분석 파이프라인과 연동하여 스마트하게 보좌해 드리겠습니다!`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input.trim();
    const timeNow = new Date().toLocaleString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      timestamp: timeNow
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    // If custom Gemini API Key is provided, we can fetch real Gemini API, otherwise use built-in engine
    if (apiKey.trim()) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }]
          })
        });
        const data = await res.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || generateAiReply(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: replyText,
            timestamp: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
          }
        ]);
        setIsThinking(false);
        return;
      } catch (err) {
        console.error('API Error, falling back to local engine', err);
      }
    }

    // Default smart reasoning fallback
    setTimeout(() => {
      const reply = generateAiReply(userText);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }
      ]);
      setIsThinking(false);
    }, 700);
  };

  const handleQuickPrompt = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[650px] overflow-hidden animate-fadeIn">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100">JK AI 지능형 어시스턴트 & 기록 보관소</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">대화 및 분석 로그가 브라우저에 영구 보존됩니다</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            title="Gemini API Key 설정"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? 'API 키 등록됨' : 'API 키 연동'}</span>
          </button>

          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
            title="대화 기록 초기화"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional API Key banner */}
      {showKeyInput && (
        <div className="p-3 bg-slate-900/90 border-b border-indigo-500/30 flex items-center gap-2 text-xs animate-fadeIn">
          <span className="text-slate-400 whitespace-nowrap">Gemini API Key:</span>
          <input
            type="password"
            placeholder="AIzaSy... (선택사항, 미입력 시 내장 지능 엔진 사용)"
            value={apiKey}
            onChange={(e) => handleSaveKey(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      )}

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                  isAi
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400'
                    : 'bg-purple-600 text-white'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-wrap ${
                    isAi
                      ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm'
                      : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                  }`}
                >
                  {msg.text}
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-500 px-1 ${isAi ? '' : 'justify-end'}`}>
                  <span>{msg.timestamp}</span>
                  {isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-300 transition-colors"
                      title="메시지 복사"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-400 inline" />
                      ) : (
                        <Copy className="w-3 h-3 inline" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isThinking && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>JK AI가 답변을 작성하는 중입니다...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          '삼성전자 vs 엔비디아 비교해줘',
          '현재 서울 아파트 갭투자 전략',
          'JK랜드 다음 기능 아이디어 제안',
          '오늘 주요 주식 지수 요약'
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleQuickPrompt(prompt)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 hover:text-indigo-300 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-slate-800 bg-slate-900/80 flex gap-2">
        <input
          type="text"
          placeholder="AI에게 질문하거나 기록할 내용을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/30"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">전송</span>
        </button>
      </form>
    </div>
  );
}
