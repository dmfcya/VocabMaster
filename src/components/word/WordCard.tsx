import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { type Word } from '../../types/word';
import { AddToNotebookButton } from './AddToNotebookButton';

interface WordCardProps {
  word: Word;
  className?: string;
}

export function WordCard({ word, className }: WordCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/words/${word.id}`)}
      className={cn(
        'group bg-white rounded-xl border border-slate-200 p-4 cursor-pointer',
        'hover:shadow-md hover:border-primary-300 transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-900 truncate">
              {word.word}
            </h3>
            <span className="text-xs text-slate-400 shrink-0">{word.phonetic}</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">{word.definition}</p>
          <span className="inline-block text-xs text-slate-400 bg-slate-100 rounded px-2 py-0.5">
            {word.partOfSpeech}
          </span>
        </div>

        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <AddToNotebookButton word={word} />
        </div>
      </div>
    </div>
  );
}
