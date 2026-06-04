import type { Word, WordCategory } from '../../types/word';
import { cet4Words } from './cet4';
import { cet6Words } from './cet6';
import { ieltsWords } from './ielts';
import { toeflWords } from './toefl';
import { kaoyanWords } from './kaoyan';
import { greWords } from './gre';
import { gaokaoWords } from './gaokao';

export const allWords: Word[] = [
  ...cet4Words,
  ...cet6Words,
  ...ieltsWords,
  ...toeflWords,
  ...kaoyanWords,
  ...greWords,
  ...gaokaoWords,
];

export const wordsByCategory: Record<WordCategory, Word[]> = {
  cet4: cet4Words,
  cet6: cet6Words,
  ielts: ieltsWords,
  toefl: toeflWords,
  kaoyan: kaoyanWords,
  gre: greWords,
  gaokao: gaokaoWords,
};

export { cet4Words, cet6Words, ieltsWords, toeflWords, kaoyanWords, greWords, gaokaoWords };
