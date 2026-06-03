import { useNavigate } from 'react-router-dom';
import { useNotebookStore } from '../stores/useNotebookStore';
import { NotebookList } from '../components/notebook/NotebookList';
import { NotebookStats } from '../components/notebook/NotebookStats';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export function NotebookPage() {
  const navigate = useNavigate();
  const words = useNotebookStore((s) => s.words);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">📝 生词本</h2>
        {words.length > 0 && (
          <Button
            variant="primary"
            onClick={() => navigate('/stories/new')}
            disabled={words.length < 3}
            title={words.length < 3 ? '至少需要3个单词才能生成故事' : '用生词本的单词生成AI故事'}
          >
            ✨ 生成故事
          </Button>
        )}
      </div>

      {words.length === 0 ? (
        <EmptyState
          icon="📝"
          title="生词本还是空的"
          description="在单词库中浏览单词，点击 + 按钮将它们加入生词本。收集至少3个单词后，就可以用AI生成有趣的故事了！"
          action={
            <Button onClick={() => navigate('/words')}>
              📖 去浏览单词库
            </Button>
          }
        />
      ) : (
        <>
          <NotebookStats />
          <div className="mt-6">
            <NotebookList />
          </div>
        </>
      )}
    </div>
  );
}
