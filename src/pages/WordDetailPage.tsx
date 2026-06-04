import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Word } from '../types/word';
import { getAllWords } from '../data/wordLoader';
import { WordDetail } from '../components/word/WordDetail';
import { NotFoundPage } from './NotFoundPage';
import { Spinner } from '../components/ui/Spinner';

export function WordDetailPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const [word, setWord] = useState<Word | null | undefined>(undefined);

  useEffect(() => {
    getAllWords().then((words) => {
      setWord(words.find((w) => w.id === wordId) ?? null);
    });
  }, [wordId]);

  if (word === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (!word) {
    return <NotFoundPage />;
  }

  return <WordDetail word={word} />;
}
