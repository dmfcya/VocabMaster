import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { Spinner } from './components/ui/Spinner';

const WordLibraryPage = lazy(() => import('./pages/WordLibraryPage').then(m => ({ default: m.WordLibraryPage })));
const WordDetailPage = lazy(() => import('./pages/WordDetailPage').then(m => ({ default: m.WordDetailPage })));
const NotebookPage = lazy(() => import('./pages/NotebookPage').then(m => ({ default: m.NotebookPage })));
const StoryCreatePage = lazy(() => import('./pages/StoryCreatePage').then(m => ({ default: m.StoryCreatePage })));
const StoryViewPage = lazy(() => import('./pages/StoryViewPage').then(m => ({ default: m.StoryViewPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="flex justify-center py-20">
      <Spinner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/words" element={
            <Suspense fallback={<PageLoader />}><WordLibraryPage /></Suspense>
          } />
          <Route path="/words/:wordId" element={
            <Suspense fallback={<PageLoader />}><WordDetailPage /></Suspense>
          } />
          <Route path="/notebook" element={
            <Suspense fallback={<PageLoader />}><NotebookPage /></Suspense>
          } />
          <Route path="/stories/new" element={
            <Suspense fallback={<PageLoader />}><StoryCreatePage /></Suspense>
          } />
          <Route path="/stories/:storyId" element={
            <Suspense fallback={<PageLoader />}><StoryViewPage /></Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
