import { useParams } from 'react-router-dom';
import { allWords } from '../data/words';
import { WordDetail } from '../components/word/WordDetail';
import { NotFoundPage } from './NotFoundPage';

export function WordDetailPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const word = allWords.find((w) => w.id === wordId);

  if (!word) {
    return <NotFoundPage />;
  }

  return <WordDetail word={word} />;
}
