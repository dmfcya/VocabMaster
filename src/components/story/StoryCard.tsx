import { useNavigate } from 'react-router-dom';
import type { Story } from '../../types/story';
import { GENRES } from '../../types/story';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate();
  const genre = GENRES.find((g) => g.id === story.genre);

  return (
    <div
      onClick={() => navigate(`/stories/${story.id}`)}
      className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md hover:border-primary-300 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{genre?.emoji || '📖'}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 truncate">{story.title}</h4>
          <p className="text-xs text-slate-400 mt-1">
            {genre?.label} · {story.wordCount} 字 · {story.words.length} 个单词
          </p>
          <p className="text-xs text-slate-400">
            {new Date(story.createdAt).toLocaleDateString('zh-CN')}
          </p>
        </div>
      </div>
    </div>
  );
}
