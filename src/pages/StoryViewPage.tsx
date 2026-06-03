import { useParams, useNavigate } from 'react-router-dom';
import { useStoryStore } from '../stores/useStoryStore';
import { StoryDisplay } from '../components/story/StoryDisplay';
import { Button } from '../components/ui/Button';
import { NotFoundPage } from './NotFoundPage';

export function StoryViewPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();
  const stories = useStoryStore((s) => s.stories);
  const story = stories.find((s) => s.id === storyId);

  if (!story) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 cursor-pointer transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </button>

      <StoryDisplay story={story} />

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={() => navigate('/stories/new')}>
          ✨ Generate Another Story
        </Button>
      </div>
    </div>
  );
}
