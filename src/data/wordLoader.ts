import type { Word, WordCategory } from '../types/word';

// In-memory cache: category → Word[]
const cache = new Map<string, Word[]>();
// Full allWords cache
let allWordsCache: Word[] | null = null;
// Word lookup map for synonyms
let wordMapCache: Map<string, Word> | null = null;

async function fetchWords(category: WordCategory): Promise<Word[]> {
  if (cache.has(category)) return cache.get(category)!;

  const res = await fetch(`/data/words/${category}.json`);
  if (!res.ok) throw new Error(`Failed to load words for ${category}`);
  const words: Word[] = await res.json();
  cache.set(category, words);
  return words;
}

export async function getWordsByCategory(category: WordCategory): Promise<Word[]> {
  return fetchWords(category);
}

export async function getAllWords(): Promise<Word[]> {
  if (allWordsCache) return allWordsCache;

  const categories: WordCategory[] = ['gaokao', 'cet4', 'cet6', 'kaoyan', 'ielts', 'toefl', 'gre'];
  const results = await Promise.all(categories.map((c) => fetchWords(c)));
  allWordsCache = results.flat();
  return allWordsCache;
}

export async function getWordMap(): Promise<Map<string, Word>> {
  if (wordMapCache) return wordMapCache;

  const all = await getAllWords();
  wordMapCache = new Map<string, Word>();
  for (const w of all) {
    const key = w.word.toLowerCase();
    if (!wordMapCache.has(key)) {
      wordMapCache.set(key, w);
    }
  }
  return wordMapCache;
}

/** Preload all word data in background */
export function preloadWords(): void {
  getAllWords();
}
