import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/words', label: '单词库', icon: '📖' },
  { to: '/notebook', label: '生词本', icon: '📝' },
  { to: '/stories/new', label: 'AI 故事', icon: '✨' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-100">
        <h1 className="text-xl font-bold text-primary-600 tracking-tight">
          📚 VocabMaster
        </h1>
        <p className="text-xs text-slate-400 mt-1">AI 智能背单词</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 text-center">
          每天进步一点点 💪
        </p>
      </div>
    </aside>
  );
}
