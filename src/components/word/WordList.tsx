import type { Word } from '../../types/word';
import { WordCard } from './WordCard';
import { EmptyState } from '../ui/EmptyState';

interface WordListProps {
  words: Word[];
}

export function WordList({ words }: WordListProps) {
  if (words.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="没有找到单词"
        description="尝试更换分类或搜索其他关键词"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {words.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
}
