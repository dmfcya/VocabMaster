import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotebookStore } from '../stores/useNotebookStore';
import { useStoryStore } from '../stores/useStoryStore';
import { WordSelector } from '../components/notebook/WordSelector';
import { GenrePicker } from '../components/story/GenrePicker';
import { StoryDisplay } from '../components/story/StoryDisplay';
import { StoryHistory } from '../components/story/StoryHistory';
import { GenerationProgress } from '../components/story/GenerationProgress';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { generateStory } from '../services/storyApi';
import type { StoryGenre } from '../types/story';

export function StoryCreatePage() {
  const navigate = useNavigate();
  const words = useNotebookStore((s) => s.words);
  const selectedWordIds = useNotebookStore((s) => s.selectedWordIds);
  const deselectAll = useNotebookStore((s) => s.deselectAll);

  const isGenerating = useStoryStore((s) => s.isGenerating);
  const generationError = useStoryStore((s) => s.generationError);
  const currentStory = useStoryStore((s) => s.currentStory);
  const setGenerating = useStoryStore((s) => s.setGenerating);
  const setError = useStoryStore((s) => s.setError);
  const setCurrentStory = useStoryStore((s) => s.setCurrentStory);
  const addStory = useStoryStore((s) => s.addStory);

  const [genre, setGenre] = useState<StoryGenre>('sci-fi');

  const selectedWords = words.filter((w) => selectedWordIds.includes(w.id));
  const canGenerate = selectedWordIds.length >= 3 && selectedWordIds.length <= 10 && !isGenerating;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setGenerating(true);
    setError(null);
    setCurrentStory(null);

    try {
      const story = await generateStory({
        words: selectedWords.map((w) => w.word),
        genre,
        language: 'en',
      });

      setCurrentStory(story);
      addStory(story);
      deselectAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">✨ AI Generate English Story</h2>
      <p className="text-sm text-slate-500 -mt-4 mb-6">Select words from your notebook and AI will craft a complete, interesting English story</p>

      {words.length < 3 ? (
        <EmptyState
          icon="📝"
          title="Not enough words in your notebook"
          description={`You have ${words.length} word(s) in your notebook. You need at least 3 words to generate a story. Add more words first!`}
          action={
            <Button onClick={() => navigate('/words')}>
              📖 去浏览单词库
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          {/* Step 1: Select words */}
          <WordSelector />

          {/* Step 2: Pick genre */}
          <GenrePicker selected={genre} onChange={setGenre} />

          {/* Generate button */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!canGenerate}
            >
              {isGenerating ? 'Generating...' : `✨ Generate Story (${selectedWordIds.length} words)`}
            </Button>
            {selectedWordIds.length > 0 && selectedWordIds.length < 3 && (
              <span className="text-sm text-amber-600">
                Need {3 - selectedWordIds.length} more word(s)
              </span>
            )}
          </div>

          {/* Error */}
          {generationError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              ❌ {generationError}
            </div>
          )}

          {/* Loading */}
          {isGenerating && <GenerationProgress />}

          {/* Result */}
          {currentStory && !isGenerating && <StoryDisplay story={currentStory} />}

          {/* History */}
          <StoryHistory />
        </div>
      )}
    </div>
  );
}
