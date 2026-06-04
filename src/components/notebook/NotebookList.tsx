import { useNotebookStore } from '../../stores/useNotebookStore';
import { NotebookWordCard } from './NotebookWordCard';
import { getMastery } from '../../types/word';

export function NotebookList() {
  const words = useNotebookStore((s) => s.words);

  if (words.length === 0) return null;

  // Sort: unreviewed first, then by review count, then by date added
  const masteryOrder = { new: 0, learning: 1, mastered: 2 };
  const sorted = [...words].sort((a, b) => {
    const ma = masteryOrder[getMastery(a.reviewCount)];
    const mb = masteryOrder[getMastery(b.reviewCount)];
    if (ma !== mb) return ma - mb;
    return b.addedAt - a.addedAt;
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sorted.map((word) => (
        <NotebookWordCard key={word.id} word={word} />
      ))}
    </div>
  );
}
