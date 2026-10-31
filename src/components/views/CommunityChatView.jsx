import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, User, Smile, MessageSquare, Sparkles, Hash, ShieldCheck, Heart } from 'lucide-react';

const INITIAL_COMMUNITY_MESSAGES = [
  {
    id: 1,
    user: '서초불패',
    badge: 'VIP 투자자',
    badgeColor: 'amber',
    text: '오늘 오라클 실적 컨콜 보셨나요? OCI 클라우드 RPO 수주 잔고가 어마어마하네요.',
    time: '22:15',
    reactions: { '🔥': 4, '👍': 3 }
  },
  {
    id: 2,
    user: '판교개발자',
    badge: 'IT 테크',
    badgeColor: 'indigo',
    text: '맞아요. 저희 회사도 AWS에서 오라클 멀티클라우드로 DB 마이그레이션 중인데 가성비랑 GPU 할당 속도가 장난 아닙니다.',
    time: '22:20',
    reactions: { '🚀': 5 }
  },
  {
    id: 3,
    user: '마포부동산러',
    badge: '공인중개사',
    badgeColor: 'emerald',
    text: '요즘 서울 9억~12억대 매물 마포태영이랑 DMC래미안 쪽 전세 갭이 4~5억 선이라 실거주 겸 갭투자 문의가 진짜 많이 들어옵니다.',
    time: '22:38',
    reactions: { '💡': 6, '👍': 2 }
  },
  {
    id: 4,
    user: '하남미사주민',
    badge: '일반',
    badgeColor: 'slate',
    text: '미사더샵센트럴포레도 10억 초반대에 호가 지지 잘 되고 있네요. 9호선 연장 호재 기다리는 중입니다.',
    time: '22:45',
    reactions: { '👍': 4 }
  }
];

export default function CommunityChatView() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('jk_community_chat');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState(() => localStorage.getItem('jk_chat_nickname') || 'JK (호스트)');
  const [isEditingNick, setIsEditingNick] = useState(false);
  const [newNick, setNewNick] = useState(nickname);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('jk_community_chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timeStr = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const newMsg = {
      id: Date.now(),
      user: nickname,
      badge: '멤버',
      badgeColor: 'purple',
      text: input.trim(),
      time: timeStr,
      reactions: {}
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  const handleReaction = (msgId, emoji) => {
    setMessages(
      messages.map((m) => {
        if (m.id === msgId) {
          const currentCount = m.reactions[emoji] || 0;
          return {
            ...m,
            reactions: { ...m.reactions, [emoji]: currentCount + 1 }
          };
        }
        return m;
      })
    );
  };

  const saveNickname = () => {
    if (newNick.trim()) {
      setNickname(newNick.trim());
      localStorage.setItem('jk_chat_nickname', newNick.trim());
    }
    setIsEditingNick(false);
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[680px] overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">JK 라운지 &bull; 사용자 실시간 토론방</h2>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                4명 접속 중
              </span>
            </div>
            <p className="text-xs text-slate-400">주식, 부동산 매물, 경제 인사이트를 자유롭게 공유하는 오픈 커뮤니티</p>
          </div>
        </div>

        {/* Nickname Setting */}
        <div className="flex items-center gap-2">
          {isEditingNick ? (
            <div className="flex items-center gap-1 text-xs">
              <input
                type="text"
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-purple-500 w-28"
              />
              <button
                onClick={saveNickname}
                className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingNick(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs text-slate-300 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>닉네임: <strong className="text-white">{nickname}</strong></span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.user === nickname;
          return (
            <div key={msg.id} className="flex gap-3 max-w-[90%]">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold flex-shrink-0 text-slate-200">
                {msg.user[0]}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{msg.user}</span>
                  {msg.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {msg.badge}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-500">{msg.time}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 text-xs md:text-sm text-slate-200 leading-relaxed rounded-tl-sm shadow-sm">
                  {msg.text}
                </div>

                {/* Reaction Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  {['👍', '🔥', '🚀', '💡'].map((emoji) => {
                    const count = msg.reactions?.[emoji] || 0;
                    return (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-mono transition-all ${
                          count > 0
                            ? 'bg-slate-800 border border-slate-700 text-slate-200'
                            : 'hover:bg-slate-800/60 text-slate-500 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span>{emoji}</span>
                        {count > 0 && <span className="font-bold">{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-slate-800 bg-slate-900/90 flex gap-2">
        <input
          type="text"
          placeholder={`${nickname}님으로 메시지 입력... (Enter로 전송)`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs md:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 transition-colors shadow-md shadow-purple-600/30"
        >
          <Send className="w-4 h-4" />
          <span>전송</span>
        </button>
      </form>
    </div>
  );
}

