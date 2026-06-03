import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../word/SearchBar';

export function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3">
      <div className="flex items-center gap-4 max-w-6xl mx-auto">
        {/* Mobile logo */}
        <h1 className="md:hidden text-lg font-bold text-primary-600 shrink-0">
          📚 VocabMaster
        </h1>

        {/* Search */}
        <div className="flex-1 max-w-lg">
          <SearchBar
            onSearch={(q) => navigate(`/words?q=${encodeURIComponent(q)}`)}
          />
        </div>
      </div>
    </header>
  );
}
