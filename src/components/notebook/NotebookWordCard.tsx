import type { NotebookWord } from '../../types/word';
import { CATEGORY_LABELS, CATEGORY_COLORS, getMastery, MASTERY_LABELS, MASTERY_COLORS } from '../../types/word';
import { useNotebookStore } from '../../stores/useNotebookStore';
import { SpeakButton } from '../ui/SpeakButton';

interface NotebookWordCardProps {
  word: NotebookWord;
  showCheckbox?: boolean;
}

export function NotebookWordCard({ word, showCheckbox = false }: NotebookWordCardProps) {
  const removeWord = useNotebookStore((s) => s.removeWord);
  const toggleWordSelection = useNotebookStore((s) => s.toggleWordSelection);
  const markAsReviewed = useNotebookStore((s) => s.markAsReviewed);
  const selectedWordIds = useNotebookStore((s) => s.selectedWordIds);
  const isSelected = selectedWordIds.includes(word.id);
  const mastery = getMastery(word.reviewCount);

  return (
    <div
      className={`bg-white rounded-xl border p-4 transition-all duration-200 ${
        isSelected
          ? 'border-primary-400 shadow-md ring-2 ring-primary-100'
          : 'border-slate-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {showCheckbox && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleWordSelection(word.id)}
                className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
              />
            )}
            <SpeakButton word={word.word} />
            <h3 className="font-semibold text-slate-900">{word.word}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[word.category]}`}>
              {CATEGORY_LABELS[word.category]}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${MASTERY_COLORS[mastery]}`}>
              {MASTERY_LABELS[mastery]}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">{word.definition}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-400">
              添加于 {new Date(word.addedAt).toLocaleDateString('zh-CN')}
              {word.reviewCount > 0 && (
                <span className="ml-2">· 复习 {word.reviewCount} 次</span>
              )}
            </p>
          </div>
          {/* Mark reviewed button */}
          {!showCheckbox && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                markAsReviewed(word.id);
              }}
              className="mt-2 text-xs text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg px-3 py-1 transition-colors cursor-pointer"
            >
              ✅ 标记已复习
            </button>
          )}
        </div>

        {!showCheckbox && (
          <button
            onClick={() => removeWord(word.id)}
            className="text-slate-300 hover:text-red-500 transition-colors cursor-pointer p-1 shrink-0"
            title="移除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
