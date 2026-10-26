import React, { useState, useEffect } from 'react';
import { Bookmark, Plus, ExternalLink, Trash2 } from 'lucide-react';

const DEFAULT_BOOKMARKS = [
  { id: 1, name: 'GitHub', url: 'https://github.com', icon: '🐙', category: '개발' },
  { id: 2, name: 'ChatGPT', url: 'https://chatgpt.com', icon: '🤖', category: 'AI' },
  { id: 3, name: 'YouTube', url: 'https://youtube.com', icon: '▶️', category: '미디어' },
  { id: 4, name: 'Google', url: 'https://google.com', icon: '🔍', category: '검색' },
  { id: 5, name: 'Notion', url: 'https://notion.so', icon: '📝', category: '생산성' },
  { id: 6, name: 'Vercel', url: 'https://vercel.com', icon: '▲', category: '호스팅' }
];

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('jk_bookmarks');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKMARKS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('🔗');

  useEffect(() => {
    localStorage.setItem('jk_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const newBookmark = {
      id: Date.now(),
      name: name.trim(),
      url: finalUrl,
      icon: icon || '🔗',
      category: '개인'
    };

    setBookmarks([...bookmarks, newBookmark]);
    setName('');
    setUrl('');
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">퀵 바로가기</h2>
              <p className="text-[11px] text-slate-400">자주 찾는 사이트 모음</p>
            </div>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            title="북마크 추가"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-2 text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="이름 (예: 네이버)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-1/2 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                placeholder="URL (예: naver.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-1/2 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end gap-1.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2.5 py-1 rounded text-slate-400 hover:text-slate-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
              >
                저장
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <a
                href={bm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 overflow-hidden flex-1"
              >
                <span className="text-lg flex-shrink-0">{bm.icon}</span>
                <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300 truncate">
                  {bm.name}
                </span>
              </a>

              <button
                onClick={() => handleDelete(bm.id)}
                className="text-slate-600 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
                title="삭제"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-500 flex justify-between items-center">
        <span>총 {bookmarks.length}개의 바로가기</span>
        <span>클릭 시 새 탭에서 열림</span>
      </div>
    </div>
  );
}

