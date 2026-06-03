import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { WordLibraryPage } from './pages/WordLibraryPage';
import { WordDetailPage } from './pages/WordDetailPage';
import { NotebookPage } from './pages/NotebookPage';
import { StoryCreatePage } from './pages/StoryCreatePage';
import { StoryViewPage } from './pages/StoryViewPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/words" element={<WordLibraryPage />} />
          <Route path="/words/:wordId" element={<WordDetailPage />} />
          <Route path="/notebook" element={<NotebookPage />} />
          <Route path="/stories/new" element={<StoryCreatePage />} />
          <Route path="/stories/:storyId" element={<StoryViewPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
