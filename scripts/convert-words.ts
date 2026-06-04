/**
 * Convert kajweb/dict JSONL data to project Word[] TypeScript format.
 * Usage: npx tsx scripts/convert-words.ts
 *
 * Source ZIPs in temp-dict/book/ are JSONL (one JSON object per line).
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const TEMP_DIR = path.resolve('temp-dict/book');
const OUTPUT_DIR = path.resolve('src/data/words');

interface SourceTrans {
  tranCn: string;
  pos: string;
  tranOther?: string;
}

interface SourceSentence {
  sContent: string;
  sCn: string;
}

interface SourceSynoItem {
  pos: string;
  tran: string;
  hwds: { w: string }[];
}

interface SourceWord {
  wordRank: number;
  headWord: string;
  bookId: string;
  content: {
    word: {
      wordHead: string;
      content: {
        usphone?: string;
        ukphone?: string;
        trans?: SourceTrans[];
        sentence?: {
          sentences?: SourceSentence[];
        };
        syno?: {
          synos?: SourceSynoItem[];
        };
      };
    };
  };
}

interface WordOutput {
  id: string;
  category: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  synonyms: string[];
}

// Config for each category
const CONFIG: Record<string, { zip: string; category: string; varName: string; maxWords?: number }> = {
  cet4: {
    zip: '1523620217431_CET4luan_1.zip',
    category: 'cet4',
    varName: 'cet4Words',
  },
  cet6: {
    zip: '1521164660466_CET6luan_1.zip',
    category: 'cet6',
    varName: 'cet6Words',
  },
  kaoyan: {
    zip: '1521164661106_KaoYanluan_1.zip',
    category: 'kaoyan',
    varName: 'kaoyanWords',
  },
  gre: {
    zip: '1521164637271_GRE_2.zip',
    category: 'gre',
    varName: 'greWords',
    maxWords: 1500, // GRE has 7199 words, take top 1500 by wordRank
  },
};

function readZipLines(zipPath: string): string[] {
  const output = execSync(`unzip -p "${zipPath}"`, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });
  return output.trim().split('\n').filter(Boolean);
}

function pickPhonetic(word: SourceWord): string {
  const us = word.content.word.content.usphone;
  if (us) return `/${us}/`;
  const uk = word.content.word.content.ukphone;
  if (uk) return `/${uk}/`;
  return '';
}

function pickPartOfSpeech(word: SourceWord): string {
  const trans = word.content.word.content.trans;
  if (!trans || trans.length === 0) return '';
  // Take all unique POS tags
  const seen = new Set<string>();
  const posList: string[] = [];
  for (const t of trans) {
    if (t.pos && !seen.has(t.pos)) {
      seen.add(t.pos);
      posList.push(t.pos);
    }
  }
  return posList.join('/');
}

function pickDefinition(word: SourceWord): string {
  const trans = word.content.word.content.trans;
  if (!trans || trans.length === 0) return '';
  // Group by POS: "v. 获取；访问 | n. 接近；入口"
  const byPos = new Map<string, string[]>();
  for (const t of trans) {
    if (!t.tranCn) continue;
    const pos = t.pos || '';
    if (!byPos.has(pos)) byPos.set(pos, []);
    byPos.get(pos)!.push(t.tranCn);
  }
  const parts: string[] = [];
  for (const [pos, defs] of byPos) {
    const prefix = pos ? `${pos}. ` : '';
    parts.push(prefix + defs.join('；'));
  }
  return parts.join(' | ');
}

function pickExample(word: SourceWord): string {
  const sentences = word.content.word.content.sentence?.sentences;
  if (!sentences || sentences.length === 0) return '';
  return sentences[0].sContent || '';
}

function pickExampleTranslation(word: SourceWord): string {
  const sentences = word.content.word.content.sentence?.sentences;
  if (!sentences || sentences.length === 0) return '';
  return sentences[0].sCn || '';
}

function pickSynonyms(word: SourceWord): string[] {
  const synos = word.content.word.content.syno?.synos;
  if (!synos || synos.length === 0) return [];
  const allSyns = new Set<string>();
  for (const syno of synos) {
    for (const hwd of syno.hwds || []) {
      if (hwd.w) allSyns.add(hwd.w);
    }
  }
  return Array.from(allSyns).slice(0, 8); // cap at 8 synonyms
}

function convertWord(word: SourceWord, category: string, index: number): WordOutput {
  const id = `${category}-${String(index + 1).padStart(4, '0')}`;
  return {
    id,
    category,
    word: word.headWord,
    phonetic: pickPhonetic(word),
    partOfSpeech: pickPartOfSpeech(word),
    definition: pickDefinition(word),
    example: pickExample(word),
    exampleTranslation: pickExampleTranslation(word),
    synonyms: pickSynonyms(word),
  };
}

function formatWordTs(words: WordOutput[], varName: string): string {
  const lines: string[] = [];
  lines.push(`import type { Word } from '../../types/word';`);
  lines.push('');
  lines.push(`export const ${varName}: Word[] = [`);

  for (const w of words) {
    const syns = w.synonyms.length > 0
      ? `, synonyms: ${JSON.stringify(w.synonyms)}`
      : '';
    const line = `  { id: '${w.id}', category: '${w.category}', word: '${w.word.replace(/'/g, "\\'")}', phonetic: '${w.phonetic.replace(/'/g, "\\'")}', partOfSpeech: '${w.partOfSpeech.replace(/'/g, "\\'")}', definition: '${w.definition.replace(/'/g, "\\'")}', example: '${w.example.replace(/'/g, "\\'")}', exampleTranslation: '${w.exampleTranslation.replace(/'/g, "\\'")}'${syns} },`;
    lines.push(line);
  }

  lines.push('];');
  lines.push('');
  return lines.join('\n');
}

function main() {
  if (!fs.existsSync(TEMP_DIR)) {
    console.error('temp-dict/book not found. Run: git clone --depth 1 https://github.com/kajweb/dict.git temp-dict');
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [key, cfg] of Object.entries(CONFIG)) {
    const zipPath = path.join(TEMP_DIR, cfg.zip);
    if (!fs.existsSync(zipPath)) {
      console.error(`ZIP not found: ${zipPath}`);
      continue;
    }

    console.log(`Processing ${key} (${cfg.zip})...`);
    const lines = readZipLines(zipPath);
    let words: SourceWord[] = lines.map(l => JSON.parse(l) as SourceWord);

    // Sort by wordRank (ascending = most important first)
    words.sort((a, b) => a.wordRank - b.wordRank);

    // Trim if maxWords specified
    if (cfg.maxWords && words.length > cfg.maxWords) {
      words = words.slice(0, cfg.maxWords);
      console.log(`  Trimmed from ${lines.length} to ${cfg.maxWords} words (by wordRank)`);
    }

    const converted = words.map((w, i) => convertWord(w, cfg.category, i));
    const tsContent = formatWordTs(converted, cfg.varName);
    const outPath = path.join(OUTPUT_DIR, `${key}.ts`);
    fs.writeFileSync(outPath, tsContent, 'utf-8');
    console.log(`  Wrote ${converted.length} words to ${outPath}`);
  }

  console.log('\nDone! All word files updated.');
}

main();
