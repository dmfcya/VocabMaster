import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Word } from '../../types/word';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../types/word';
import { getWordMap, preloadWords } from '../../data/wordLoader';
import { AddToNotebookButton } from './AddToNotebookButton';
import { SpeakButton } from '../ui/SpeakButton';

interface WordDetailProps {
  word: Word;
}

export function WordDetail({ word }: WordDetailProps) {
  const navigate = useNavigate();
  const [wordMap, setWordMap] = useState<Map<string, Word> | null>(null);

  useEffect(() => {
    getWordMap().then(setWordMap);
    preloadWords(); // preload the rest in background
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 cursor-pointer transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </button>

      {/* Word header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <SpeakButton word={word.word} className="w-8 h-8 p-1.5" />
              <h1 className="text-3xl font-bold text-slate-900">{word.word}</h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span>{word.phonetic}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[word.category]}`}>
                {CATEGORY_LABELS[word.category]}
              </span>
            </div>
          </div>
          <AddToNotebookButton word={word} />
        </div>

        {/* Definition */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">释义</h3>
          <p className="text-xl text-slate-800">{word.definition}</p>
          <span className="inline-block mt-2 text-sm text-slate-500 bg-slate-100 rounded-lg px-3 py-1">
            {word.partOfSpeech}
          </span>
        </div>

        {/* Example */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">例句</h3>
          <p className="text-slate-700 italic mb-1">"{word.example}"</p>
          <p className="text-sm text-slate-500">{word.exampleTranslation}</p>
        </div>

        {/* Synonyms */}
        {word.synonyms && word.synonyms.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
              近义词{wordMap ? '（点击跳转）' : ''}
            </h3>
            <div className="flex flex-wrap gap-2">
              {word.synonyms.map((syn) => {
                const matchedWord = wordMap?.get(syn.toLowerCase());
                if (matchedWord) {
                  return (
                    <button
                      key={syn}
                      onClick={() => navigate(`/words/${matchedWord.id}`)}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors cursor-pointer"
                      title={`查看 ${syn} 的详情`}
                    >
                      {syn}
                    </button>
                  );
                }
                return (
                  <span key={syn} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-sm">
                    {syn}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
