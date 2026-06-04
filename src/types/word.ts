export type WordCategory = 'cet4' | 'cet6' | 'ielts' | 'toefl' | 'kaoyan' | 'gre' | 'gaokao';

export const CATEGORY_LABELS: Record<WordCategory, string> = {
  cet4: 'CET-4',
  cet6: 'CET-6',
  ielts: 'IELTS',
  toefl: 'TOEFL',
  kaoyan: '考研',
  gre: 'GRE',
  gaokao: '高考',
};

export const CATEGORY_COLORS: Record<WordCategory, string> = {
  cet4: 'bg-emerald-100 text-emerald-800',
  cet6: 'bg-blue-100 text-blue-800',
  ielts: 'bg-purple-100 text-purple-800',
  toefl: 'bg-orange-100 text-orange-800',
  kaoyan: 'bg-rose-100 text-rose-800',
  gre: 'bg-indigo-100 text-indigo-800',
  gaokao: 'bg-amber-100 text-amber-800',
};

export interface Word {
  id: string;
  category: WordCategory;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  synonyms?: string[];
}

export interface NotebookWord {
  id: string;
  wordId: string;
  word: string;
  category: WordCategory;
  definition: string;
  addedAt: number;
  lastReviewedAt: number | null;
  reviewCount: number;
}
