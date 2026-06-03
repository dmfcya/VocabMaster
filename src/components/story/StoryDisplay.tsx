import type { Story } from '../../types/story';
import { GENRES } from '../../types/story';
import { highlightStoryContent } from '../../utils/highlightWords';

interface StoryDisplayProps {
  story: Story;
}

export function StoryDisplay({ story }: StoryDisplayProps) {
  const genre = GENRES.find((g) => g.id === story.genre);
  const highlightedHtml = highlightStoryContent(story.content);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      {/* Story header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <span className="text-3xl">{genre?.emoji || '📖'}</span>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900">{story.title}</h2>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            <span>{genre?.label}</span>
            <span>·</span>
            <span>{story.wordCount} words</span>
            <span>·</span>
            <span>{new Date(story.createdAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      </div>

      {/* Story content */}
      <div
        className="prose prose-slate max-w-none text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />

      {/* Words used */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <h4 className="text-sm font-medium text-slate-400 mb-3">Vocabulary in this story:</h4>
        <div className="flex flex-wrap gap-2">
          {story.words.map((word) => (
            <span
              key={word}
              className="word-highlight"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
