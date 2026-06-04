import { useNotebookStore } from '../../stores/useNotebookStore';
import { NotebookWordCard } from './NotebookWordCard';

export function NotebookList() {
  const words = useNotebookStore((s) => s.words);

  if (words.length === 0) return null;

  // Sort by most recently added first
  const sorted = [...words].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 card-stagger">
      {sorted.map((word) => (
        <NotebookWordCard key={word.id} word={word} />
      ))}
    </div>
  );
}
