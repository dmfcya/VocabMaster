import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { to: '/words', label: '单词库', icon: '📖' },
  { to: '/notebook', label: '生词本', icon: '📝' },
  { to: '/stories/new', label: 'AI故事', icon: '✨' },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary-600'
                  : 'text-slate-400 hover:text-slate-600'
              )
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
