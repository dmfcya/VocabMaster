import { useNotebookStore } from '../../stores/useNotebookStore';
import { CATEGORY_LABELS, CATEGORY_COLORS, getMastery, type WordCategory, type MasteryLevel } from '../../types/word';

export function NotebookStats() {
  const words = useNotebookStore((s) => s.words);

  const stats = words.reduce(
    (acc, w) => {
      acc.total++;
      acc.byCategory[w.category] = (acc.byCategory[w.category] || 0) + 1;
      const mastery = getMastery(w.reviewCount);
      acc.byMastery[mastery]++;
      return acc;
    },
    { total: 0, byCategory: {} as Record<string, number>, byMastery: { new: 0, learning: 0, mastered: 0 } as Record<MasteryLevel, number> }
  );

  return (
    <div className="space-y-3">
      {/* Word count + category breakdown */}
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

      {/* Review progress */}
      {stats.total > 0 && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">复习进度：</span>
          <span className="bg-slate-100 text-slate-600 rounded-full px-3 py-1">
            🆕 未复习 {stats.byMastery.new}
          </span>
          <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">
            📖 学习中 {stats.byMastery.learning}
          </span>
          <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">
            ✅ 已掌握 {stats.byMastery.mastered}
          </span>
          {/* Progress bar */}
          <div className="flex-1 max-w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${stats.total > 0 ? Math.round((stats.byMastery.mastered / stats.total) * 100) : 0}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">
            {stats.total > 0 ? Math.round((stats.byMastery.mastered / stats.total) * 100) : 0}% 已掌握
          </span>
        </div>
      )}
    </div>
  );
}
