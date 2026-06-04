import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryTabs } from '../components/word/CategoryTabs';
import { WordList } from '../components/word/WordList';
import { Spinner } from '../components/ui/Spinner';
import { getWordsByCategory, getAllWords, preloadWords } from '../data/wordLoader';
import type { Word, WordCategory } from '../types/word';

export function WordLibraryPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeCategory, setActiveCategory] = useState<WordCategory | 'all'>('all');
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    setWords(null); // reset on category change
    const promise = activeCategory === 'all'
      ? getAllWords()
      : getWordsByCategory(activeCategory);
    promise.then((data) => setWords(data));
    preloadWords(); // preload rest in background
  }, [activeCategory]);

  const filteredWords = useMemo(() => {
    if (!words) return null;

    let result = words;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definition.includes(q)
      );
    }

    return result;
  }, [words, query]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">📖 单词库</h2>
        {filteredWords && (
          <span className="text-sm text-slate-500">
            共 {filteredWords.length} 个单词
          </span>
        )}
      </div>

      <CategoryTabs
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {query && (
        <p className="mt-4 text-sm text-slate-500">
          搜索 "{query}" 的结果：
        </p>
      )}

      <div className="mt-6">
        {filteredWords === null ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <WordList words={filteredWords} />
        )}
      </div>
    </div>
  );
}
