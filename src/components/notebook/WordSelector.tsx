import { useNotebookStore } from '../../stores/useNotebookStore';
import { NotebookWordCard } from './NotebookWordCard';
import { Button } from '../ui/Button';

export function WordSelector() {
  const words = useNotebookStore((s) => s.words);
  const selectedWordIds = useNotebookStore((s) => s.selectedWordIds);
  const selectAll = useNotebookStore((s) => s.selectAll);
  const deselectAll = useNotebookStore((s) => s.deselectAll);

  const sorted = [...words].sort((a, b) => b.addedAt - a.addedAt);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-500">
          Select Words ({selectedWordIds.length}/10)
        </h3>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
          >
            Deselect
          </button>
        </div>
      </div>

      {selectedWordIds.length > 0 && selectedWordIds.length < 3 && (
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">
          ⚠️ Select at least 3 words to generate a story
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
        {sorted.map((word) => (
          <NotebookWordCard key={word.id} word={word} showCheckbox />
        ))}
      </div>
    </div>
  );
}
