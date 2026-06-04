import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryTabs } from '../components/word/CategoryTabs';
import { WordList } from '../components/word/WordList';
import { allWords } from '../data/words';
import type { WordCategory } from '../types/word';

export function WordLibraryPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeCategory, setActiveCategory] = useState<WordCategory | 'all'>('all');

  const filteredWords = useMemo(() => {
    let words = activeCategory === 'all'
      ? allWords
      : allWords.filter((w) => w.category === activeCategory);

    if (query) {
      const q = query.toLowerCase();
      words = words.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definition.includes(q)
      );
    }

    // Deduplicate by word name (case-insensitive) when showing all categories
    if (activeCategory === 'all') {
      const seen = new Set<string>();
      words = words.filter((w) => {
        const key = w.word.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return words;
  }, [activeCategory, query]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">📖 单词库</h2>
        <span className="text-sm text-slate-500">
          共 {filteredWords.length} 个单词
        </span>
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
        <WordList words={filteredWords} />
      </div>
    </div>
  );
}
