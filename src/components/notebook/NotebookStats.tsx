import { useNotebookStore } from '../../stores/useNotebookStore';
import { CATEGORY_LABELS, CATEGORY_COLORS, type WordCategory } from '../../types/word';

export function NotebookStats() {
  const words = useNotebookStore((s) => s.words);

  const stats = words.reduce(
    (acc, w) => {
      acc.total++;
      acc.byCategory[w.category] = (acc.byCategory[w.category] || 0) + 1;
      return acc;
    },
    { total: 0, byCategory: {} as Record<string, number> }
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm">
        <span className="text-2xl font-bold text-slate-900">{stats.total}</span>
        <span className="text-sm text-slate-500 ml-2">个单词</span>
      </div>
      {Object.entries(stats.byCategory)
        .sort(([, a], [, b]) => b - a)
        .map(([cat, count]) => (
          <div
            key={cat}
            className={`rounded-xl px-3 py-2 shadow-sm ${
              CATEGORY_COLORS[cat as WordCategory] || 'bg-slate-100 text-slate-700'
            }`}
          >
            <span className="font-semibold">{CATEGORY_LABELS[cat as WordCategory] || cat}</span>
            <span className="ml-2 opacity-75">{count}</span>
          </div>
        ))}
    </div>
  );
}
