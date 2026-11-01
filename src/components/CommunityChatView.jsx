import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, Trash2 } from 'lucide-react';

export default function CommunityChatView() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('jk_community_chat_final');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [nickname, setNickname] = useState(() => localStorage.getItem('jk_chat_nickname') || '방문자');
  const [isEditingNick, setIsEditingNick] = useState(false);
  const [newNick, setNewNick] = useState(nickname);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('jk_community_chat_final', JSON.stringify(messages));
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
      text: input.trim(),
      time: timeStr
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  const saveNickname = () => {
    if (newNick.trim()) {
      setNickname(newNick.trim());
      localStorage.setItem('jk_chat_nickname', newNick.trim());
    }
    setIsEditingNick(false);
  };

  const clearChat = () => {
    if (window.confirm('모든 대화 기록을 완전히 지울까요?')) {
      setMessages([]);
      localStorage.removeItem('jk_community_chat_final');
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[680px] overflow-hidden animate-fadeIn">
      <div className="p-4 md:p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">JK 실시간 오픈 토론방</h2>
            <p className="text-xs text-slate-400">가짜 봇 대화 없이, 본인만의 메시지를 입력하여 소통하세요.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEditingNick ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newNick}
                onChange={(e) => setNewNick(e.target.value)}
                placeholder="새 닉네임"
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white w-28"
              />
              <button onClick={saveNickname} className="px-3 py-1.5 rounded-xl bg-purple-600 text-xs text-white font-bold">확인</button>
            </div>
          ) : (
            <button onClick={() => setIsEditingNick(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span>Nick: <strong className="text-white">{nickname}</strong></span>
            </button>
          )}
          <button onClick={clearChat} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-900/30 text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> 기록지우기
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
            <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
            <p>아직 등록된 메시지가 없습니다.</p>
            <p>첫 번째 메시지를 입력해 보세요!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 max-w-[90%]">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-200">
                {msg.user[0]}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{msg.user}</span>
                  <span className="text-[10px] font-mono text-slate-500">{msg.time}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs md:text-sm text-slate-200 leading-relaxed rounded-tl-sm shadow-sm">
                  {msg.text}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-slate-800 bg-slate-900/90 flex gap-2">
        <input
          type="text"
          placeholder="메시지 입력..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs md:text-sm text-slate-100 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs md:text-sm flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" /> 전송
        </button>
      </form>
    </div>
  );
}