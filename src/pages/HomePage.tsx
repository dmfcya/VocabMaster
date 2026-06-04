import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-24 px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <span className="text-5xl md:text-6xl mb-4 md:mb-6 block animate-float">📚</span>
        <h1 className="text-2xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
          VocabMaster
        </h1>
        <p className="text-base md:text-lg text-slate-500 mb-2">
          AI 智能背单词 · 让记忆更有趣
        </p>
        <p className="text-sm text-slate-400 mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
          浏览海量词库，建立专属生词本，用 AI 将单词编成有趣的小故事——在语境中轻松记住每一个单词
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" onClick={() => navigate('/words')} className="w-full sm:w-auto">
            📖 浏览单词库
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/notebook')} className="w-full sm:w-auto">
            📝 我的生词本
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/stories/new')} className="w-full sm:w-auto">
            ✨ AI 生成故事
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-20 max-w-4xl w-full">
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
          <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">📖</span>
          <h3 className="font-semibold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">七大词库</h3>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            覆盖高考、CET-4/6、考研、IELTS、TOEFL、GRE，近万个精选单词
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
          <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">📝</span>
          <h3 className="font-semibold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">生词本</h3>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            打造专属生词本，TTS 发音 + 一键跳转详情
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
          <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">✨</span>
          <h3 className="font-semibold text-slate-800 mb-1 md:mb-2 text-sm md:text-base">AI 故事生成</h3>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
            AI 将生词编成有趣故事，在阅读中轻松记单词
          </p>
        </div>
      </div>
    </div>
  );
}
