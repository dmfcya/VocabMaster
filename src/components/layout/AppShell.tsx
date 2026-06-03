import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../ui/Toast';

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
      <ToastContainer />
    </div>
  );
}
