import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <span className="text-6xl mb-6 block">📚</span>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          VocabMaster
        </h1>
        <p className="text-lg text-slate-500 mb-2">
          AI 智能背单词 · 让记忆更有趣
        </p>
        <p className="text-sm text-slate-400 mb-10 max-w-md mx-auto">
          浏览海量词库，建立专属生词本，用 AI 将单词编成有趣的小故事——在语境中轻松记住每一个单词
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate('/words')}>
            📖 浏览单词库
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/notebook')}>
            📝 我的生词本
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/stories/new')}>
            ✨ AI 生成故事
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <span className="text-3xl mb-3 block">📖</span>
          <h3 className="font-semibold text-slate-800 mb-2">六大词库</h3>
          <p className="text-sm text-slate-500">
            覆盖 CET-4/6、IELTS、TOEFL、考研、GRE，近千个精选单词
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <span className="text-3xl mb-3 block">📝</span>
          <h3 className="font-semibold text-slate-800 mb-2">生词本</h3>
          <p className="text-sm text-slate-500">
            打造属于你自己的生词本，随时随地复习巩固
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
          <span className="text-3xl mb-3 block">✨</span>
          <h3 className="font-semibold text-slate-800 mb-2">AI 故事生成</h3>
          <p className="text-sm text-slate-500">
            选择生词本中的单词，AI 为你创作有趣的故事，在阅读中记单词
          </p>
        </div>
      </div>
    </div>
  );
}
