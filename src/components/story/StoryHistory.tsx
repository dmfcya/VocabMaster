import { useStoryStore } from '../../stores/useStoryStore';
import { StoryCard } from './StoryCard';
import { EmptyState } from '../ui/EmptyState';

export function StoryHistory() {
  const stories = useStoryStore((s) => s.stories);

  if (stories.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">📚 历史故事</h3>
        <EmptyState
          icon="📖"
          title="还没有生成过故事"
          description="选择生词本中的单词，用AI创作你的第一个故事吧！"
        />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        📚 历史故事（{stories.length}）
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
