import { useNotebookStore } from '../../stores/useNotebookStore';
import type { Word } from '../../types/word';
import { showToast } from '../ui/Toast';

interface AddToNotebookButtonProps {
  word: Word;
}

export function AddToNotebookButton({ word }: AddToNotebookButtonProps) {
  const isWordInNotebook = useNotebookStore((s) => s.isWordInNotebook);
  const addWord = useNotebookStore((s) => s.addWord);
  const removeWord = useNotebookStore((s) => s.removeWord);
  const words = useNotebookStore((s) => s.words);

  const inNotebook = isWordInNotebook(word.id);
  const notebookEntry = words.find((w) => w.wordId === word.id);

  const handleClick = () => {
    if (inNotebook && notebookEntry) {
      removeWord(notebookEntry.id);
      showToast(`"${word.word}" 已从生词本移除`, 'info');
    } else {
      addWord(word);
      showToast(`"${word.word}" 已加入生词本 ✅`, 'success');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer ${
        inNotebook
          ? 'bg-primary-100 text-primary-600 hover:bg-red-100 hover:text-red-500'
          : 'bg-slate-100 text-slate-400 hover:bg-primary-50 hover:text-primary-600'
      }`}
      title={inNotebook ? '从生词本中移除' : '加入生词本'}
    >
      {inNotebook ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </button>
  );
}
