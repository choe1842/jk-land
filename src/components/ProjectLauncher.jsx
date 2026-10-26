import React, { useState, useEffect } from 'react';
import { Layers, Plus, ExternalLink, Code2, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'JK LAND 포털',
    description: '어디서든 접속 가능한 올인원 개인 대시보드 및 웹 런처',
    tag: '대시보드',
    status: '운영 중',
    statusColor: 'emerald',
    icon: '🏰',
    url: '#'
  },
  {
    id: 2,
    title: 'AI 스마트 비서',
    description: '개인 맞춤형 업무 자동화 및 일상 메모 요약 에이전트',
    tag: 'AI/자동화',
    status: '개발 예정',
    statusColor: 'amber',
    icon: '🤖',
    url: '#'
  },
  {
    id: 3,
    title: '나만의 개발 아카이브',
    description: '학습 내용, 스니펫, 유용한 코드 조각들을 모아두는 기술 위키',
    tag: '아카이브',
    status: '기획 중',
    statusColor: 'indigo',
    icon: '📚',
    url: '#'
  }
];

export default function ProjectLauncher() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('jk_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('프로젝트');
  const [newIcon, setNewIcon] = useState('💡');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('jk_projects', JSON.stringify(projects));
  }, [projects]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProj = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim() || '진행 예정인 새로운 프로젝트입니다.',
      tag: newTag,
      status: '개발 예정',
      statusColor: 'amber',
      icon: newIcon || '🚀',
      url: newUrl.trim() || '#'
    };

    setProjects([...projects, newProj]);
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getStatusBadge = (status, color) => {
    const colors = {
      emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[color] || colors.slate}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">JK 프로젝트 & 랩</h2>
            <p className="text-xs text-slate-400">앞으로 개발하고 연결할 서비스 목록</p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>프로젝트 추가</span>
        </button>
      </div>

      {/* Add Project Form Modal/Box */}
      {isAdding && (
        <form onSubmit={handleAdd} className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3 animate-fadeIn">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> 새 프로젝트 등록
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="프로젝트 이름 (예: 가계부 앱)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="태그/분류 (예: 웹앱, 유틸, AI)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <textarea
            placeholder="프로젝트 설명"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
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
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              등록하기
            </button>
          </div>
        </form>
      )}

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group glass-panel rounded-xl p-5 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-200 relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {proj.icon}
                </span>
                <div className="flex items-center gap-1.5">
                  {getStatusBadge(proj.status, proj.statusColor)}
                  {proj.id > 3 && (
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-400">
                {proj.tag}
              </span>
              <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mt-0.5">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Code2 className="w-3.5 h-3.5" /> 준비 중
              </span>
              {proj.url !== '#' ? (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  열기 <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-600 cursor-not-allowed">
                  곧 오픈 🚀
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

