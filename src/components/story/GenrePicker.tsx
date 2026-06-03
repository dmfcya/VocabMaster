import { cn } from '../../utils/cn';
import { GENRES, type StoryGenre } from '../../types/story';

interface GenrePickerProps {
  selected: StoryGenre;
  onChange: (genre: StoryGenre) => void;
}

export function GenrePicker({ selected, onChange }: GenrePickerProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-slate-500 mb-3">选择故事类型</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onChange(genre.id)}
            className={cn(
              'flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-150 cursor-pointer',
              selected === genre.id
                ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-100 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
            )}
          >
            <span className="text-2xl">{genre.emoji}</span>
            <span className="text-xs font-medium text-slate-700">{genre.label}</span>
            <span className="text-[10px] text-slate-400 leading-tight text-center hidden md:block">
              {genre.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
