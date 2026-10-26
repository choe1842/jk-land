import React, { useState, useEffect } from 'react';
import { CheckSquare, Edit3, Trash2, Check, Copy, CheckCircle2 } from 'lucide-react';

const DEFAULT_TODOS = [
  { id: 1, text: 'JK랜드 웹사이트 첫 버전 만들기', completed: true },
  { id: 2, text: 'Vercel에 무료 배포하고 주소 확인하기', completed: false },
  { id: 3, text: '모바일 스마트폰으로 접속 테스트해보기', completed: false }
];

export default function QuickNotes() {
  const [activeTab, setActiveTab] = useState('todo'); // 'todo' | 'notes'

  // Todos state
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('jk_todos');
    return saved ? JSON.parse(saved) : DEFAULT_TODOS;
  });
  const [newTodo, setNewTodo] = useState('');

  // Notepad state
  const [note, setNote] = useState(() => {
    return localStorage.getItem('jk_note') || '💡 JK랜드 아이디어 메모장\n- 어디서든 열어볼 수 있는 나만의 공간 완성하기!\n- 다음 개발할 프로젝트: AI 챗봇 연결';
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('jk_todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('jk_note', note);
  }, [note]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo.trim(), completed: false }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleCopyNote = () => {
    navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progressPercent = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('todo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'todo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>투두 리스트 ({completedCount}/{todos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>퀵 메모장</span>
            </button>
          </div>

          {activeTab === 'notes' && (
            <button
              onClick={handleCopyNote}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : '복사'}</span>
            </button>
          )}
        </div>

        {/* Tab 1: Todos */}
        {activeTab === 'todo' && (
          <div>
            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>진행률</span>
                <span className="font-semibold text-indigo-400">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="새로운 할 일 입력..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
              >
                추가
              </button>
            </form>

            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`group flex items-center justify-between p-2 rounded-xl border text-xs transition-all ${
                    todo.completed
                      ? 'bg-slate-900/30 border-slate-900 text-slate-500'
                      : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-600 group-hover:border-indigo-400'
                      }`}
                    >
                      {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={todo.completed ? 'line-through text-slate-500' : ''}>
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Scratchpad */}
        {activeTab === 'notes' && (
          <div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="여기에 자유롭게 메모를 남겨보세요. 자동으로 안전하게 저장됩니다..."
              rows={8}
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono resize-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              * 기기(브라우저)에 자동 저장되어 언제든 다시 확인하실 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

