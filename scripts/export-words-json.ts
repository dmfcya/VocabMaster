/**
 * Convert word TS files to JSON files in public/data/words/
 * Usage: npx tsx scripts/export-words-json.ts
 */
import { gaokaoWords } from '../src/data/words/gaokao';
import { cet4Words } from '../src/data/words/cet4';
import { cet6Words } from '../src/data/words/cet6';
import { kaoyanWords } from '../src/data/words/kaoyan';
import { ieltsWords } from '../src/data/words/ielts';
import { toeflWords } from '../src/data/words/toefl';
import { greWords } from '../src/data/words/gre';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve('public/data/words');
fs.mkdirSync(outDir, { recursive: true });

const categories: Record<string, any[]> = {
  gaokao: gaokaoWords,
  cet4: cet4Words,
  cet6: cet6Words,
  kaoyan: kaoyanWords,
  ielts: ieltsWords,
  toefl: toeflWords,
  gre: greWords,
};

for (const [cat, words] of Object.entries(categories)) {
  const outPath = path.join(outDir, `${cat}.json`);
  fs.writeFileSync(outPath, JSON.stringify(words), 'utf-8');
  console.log(`Wrote ${words.length} words to ${outPath}`);
}

// Also write a combined index (lightweight, just word + id for search)
const index = Object.values(categories).flat().map(w => ({
  id: w.id,
  word: w.word,
  category: w.category,
}));
fs.writeFileSync(path.join(outDir, '_index.json'), JSON.stringify(index), 'utf-8');
console.log(`Wrote index with ${index.length} entries`);

// Print sizes
for (const [cat] of Object.entries(categories)) {
  const filePath = path.join(outDir, `${cat}.json`);
  const size = fs.statSync(filePath).size;
  console.log(`  ${cat}.json: ${(size / 1024).toFixed(1)} KB`);
}
const indexSize = fs.statSync(path.join(outDir, '_index.json')).size;
console.log(`  _index.json: ${(indexSize / 1024).toFixed(1)} KB`);
