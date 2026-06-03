import { cn } from '../../utils/cn';
import { CATEGORY_LABELS, type WordCategory } from '../../types/word';

const categories: Array<{ key: WordCategory | 'all'; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'cet4', label: 'CET-4' },
  { key: 'cet6', label: 'CET-6' },
  { key: 'ielts', label: 'IELTS' },
  { key: 'toefl', label: 'TOEFL' },
  { key: 'kaoyan', label: '考研' },
  { key: 'gre', label: 'GRE' },
];

interface CategoryTabsProps {
  active: WordCategory | 'all';
  onChange: (cat: WordCategory | 'all') => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer',
            active === cat.key
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
